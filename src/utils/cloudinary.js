import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath);

    console.log(`file is successfully up load on cloudinary ${response.url}`);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log(
      `if error while upload file on cludinary and remove file in local disk`
    );
  }
};

export { uploadOnCloudinary };
