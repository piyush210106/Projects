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
      folder: "resume",
      resource_type: "raw",
      format: file.originalname.split(".").pop(),
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
      // Remove access_mode and type - use access_control instead
      access_control: [
        {
          access_type: "anonymous", // This makes it publicly accessible
        }
      ],
    };
  },
});

const upload = multer({ storage });

export { cloudinary, upload };