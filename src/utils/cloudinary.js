import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

 cloudinary.config({ 
    cloud_name: process.env.CLOUDNIARY_CLOUD_NAME, 
    api_key: process.env.CLOUDNIARY_API_KEY, 
    api_secret: process.env.CLOUDNIARY_CLOUD_SECRET
});

const uplaodOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null
        }
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has ben uploaded successfully
        console.log("file is uploaded on cloudinary", response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)  // remove the locally saved file as a upload operation failed  
        return null 
    }
}

export {uplaodOnCloudinary}