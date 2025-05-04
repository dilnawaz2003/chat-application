import { v2 as cloudinary } from "cloudinary";
import ErrorHandler from "./error-handler";

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  file: Express.Multer.File
): Promise<{ public_id: string; url: string }> => {
  try {
    const base64 = file.buffer.toString("base64");
    const dataUri = `data:${file.mimetype};base64,${base64}`;
    const result = await cloudinary.uploader.upload(dataUri, {
      resource_type: "auto",
    });

    return {
      url: result.public_id,
      public_id: result.secure_url,
    };
  } catch (error) {
    console.log(error);
    throw new ErrorHandler("Error uploading to Cloudinary", 500);
  }
};

export default cloudinary;
