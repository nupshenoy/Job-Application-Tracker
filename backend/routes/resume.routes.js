import express from 'express';
import upload from '../middlewares/cloudinaryUpload.js';
import auth from '../middlewares/authMiddleware.js';
import { Resume } from '../models/Resume.model.js'; // Model you must create

const router = express.Router();

router.post('/upload', auth, upload.single('resume'), async (req, res) => {
  try {
    const { originalname, path } = req.file;

    const newResume = new Resume({
      user: req.user._id,
      name: originalname,
      url: path, // or req.file.secure_url
    });

    await newResume.save();
    res.json(newResume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Resume upload failed', error: err.message });
  }
});


router.get('/', auth, async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(resumes);
});

export default router;
