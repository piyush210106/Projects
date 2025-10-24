import {v2 as cloudinary} from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    
    return {
      folder: "resumes", // folder name in Cloudinary
      resource_type: "auto", // auto-detect file type
      format: file.originalname.split(".").pop(), // preserve file extension
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

const upload = multer({ storage });

export { cloudinary, upload };