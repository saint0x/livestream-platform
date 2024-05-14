// server/controllers/fileController.js

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const fileController = {
  uploadFile: upload.single('file'),
  downloadFile: (req, res) => {
    const { filename } = req.params;
    res.download(`uploads/${filename}`);
  },
};

module.exports = fileController;
