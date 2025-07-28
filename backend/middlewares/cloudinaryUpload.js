import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'resumes',
    resource_type: 'raw',
    public_id: (req, file) => file.originalname.split('.').slice(0, -1).join(''),
    // use_filename: true,
    unique_filename: false,
    allowed_formats: ['pdf', 'docx', 'doc'],
    access_mode: 'public', 
  },
});

export default multer({ storage });
