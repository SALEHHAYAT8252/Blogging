import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
export async function cloudinaryUpload(avatarPath) {

    const uploadResult = await cloudinary.uploader
        .upload(
            avatarPath, {
            folder: '/blog'
        }
        )
        .catch((error) => {

            console.log(error);
        });
    fs.unlink(avatarPath, (unlinkErr) => {
        if (unlinkErr) {
            console.error('Error deleting file:', unlinkErr.message);
            return;
        }
        console.log('File deleted successfully:',avatarPath);
    });
    return uploadResult;
}