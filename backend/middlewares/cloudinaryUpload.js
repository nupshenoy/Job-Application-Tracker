import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: 'dsdiiuvnl',
  api_key: '319521699458375',
  api_secret: 'AzNgId0H1gmUTZyBl4oCSbmQPh4',
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
