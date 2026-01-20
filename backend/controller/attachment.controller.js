import { writeFile } from 'fs';
import { fileTypeFromBuffer } from 'file-type';

const createAttachment = async (req, res) => {
    if (msg.attachment.length > 0) {
                const file = msg.attachment[0].file;
                const fileType = await fileTypeFromBuffer(file);
                if (!["jpg", 'png', 'jpeg', 'mp4', 'pdf'].includes(fileType.ext)) return;
    
                if (['jpg', 'png', 'jpeg'].includes(fileType.ext)) { 
                    const filePath = `/uploads/image_/${Date.now()}.${fileType.ext}`;
                    writeFile(filePath, file, (err) => { 
                        if (err) console.log('error saving file:', err);
                    });
                }
                else if (fileType.ext === 'mp4') {
                    const filePath = `/uploads/video_/${Date.now()}.${fileType.ext}`;
                    writeFile(filePath, file, (err) => { 
                        if (err) console.log('error saving file:', err);
                    });
                }else if (fileType.ext === 'pdf') {
                    const filePath = `/uploads/document_/${Date.now()}.${fileType.ext}`;
                    writeFile(filePath, file, (err) => { 
                        if (err) console.log('error saving file:', err);
                    });
                }
            }
}

export {
    createAttachment
}