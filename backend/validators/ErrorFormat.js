import response from "../utils/response.js";

export const formatError = (message) => {
    if (message.includes(["ValidationError"])) {
        message = response(422, null, null, message.replace(/ValidationError:/ig, "").split(".").map(val => val.trim()).filter(x => x !== "").join(","));
    } else if (message.includes(["UserAkses"])) {
        message = response(403, null, null, message.replace("UserAkses:", ""));
    } else if (message.includes(["NotFound"])) {
        message = response(404, null, null, message.replace("NotFound:",""));
    } else if (message.includes(["AlreadyExist"])) {
        message = response(409,null, null, message.replace("AlreadyExist:",""))
    } else {
        message = response(500, null, null, "Internal Server Error");
    }
    return message
}