import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    console.log(localFilePath);
    try {
        if (!localFilePath) {
            return null
        }
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has ben uploaded successfully
        // fs.unlinkSync(localFilePath) 
        return response
    } catch (error) {
        console.log(error)
        fs.unlinkSync(localFilePath)  // remove the locally saved file as a upload operation failed  
        return null 
    }
}

export {uploadOnCloudinary}