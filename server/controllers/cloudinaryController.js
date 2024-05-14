// server/controllers/cloudinaryController.js

const cloudinary = require('cloudinary').v2;

'CLOUDINARY_NAME' = process.env['CLOUDINARY_NAME']
'CLOUDINARY_API_KEY' = process.env['CLOUDINARY_API_KEY']
'CLOUDINARY_API_SECRET' = process.env['CLOUDINARY_API_KEY']

cloudinary.config({
  cloud_name: 'CLOUDINARY_NAME',
  api_key: 'CLOUDINARY_API_KEY',
  api_secret: 'CLOUDINARY_API_SECRET',
});

const cloudinaryController = {
  uploadImage: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      res.json(result);
    } catch (error) {
      console.error('Error uploading image:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getImage: (req, res) => {
    const { filename } = req.params;
    res.redirect(cloudinary.url(filename));
  },
};

module.exports = cloudinaryController;
