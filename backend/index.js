import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { Server } from 'socket.io';
import { router } from './router/index.js';
import { database } from './database/database.js';
import { models } from './model/index.js';
import { socketAuth } from './socketIO/auth.js';
import { joinRoomHandler } from './socketIO/join-room.js';
import { messageEventHandler } from './socketIO/messageEvent.js';

const startServer = async () => {
    const app = express();
    const server = createServer(app);

    app.use(cookieParser());

    app.use(cors({
        origin: "*",
        methods: ["GET", "POST","PUT","DELETE","PATCH"],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    app.use(express.json());

    const io = new Server(server, {
        maxHttpBufferSize: 1e8,
        cors: {
            origin: "*",
        },
        handlePreflightRequest: (req, res) => {
            res.writeHead(200, {
                "Access-Control-Allow-Origin": "localhost:3000",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,PATCH",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            });
            res.end();
        }
    });

    io.use(socketAuth);
    
    io.on('connection', (socket) => {
        joinRoomHandler(io, socket);
        messageEventHandler(io, socket);
    })
    
    app.use((req, res, next) => {
        req.io = io;
        next();
    })

    // Connect to database once at startup
    await database.createConnection();
    models.defineAssociations();

    app.use("/api",router);

    server.listen(4000, () => {
        console.log('Server is running on http://localhost:4000');
    });
};

startServer();