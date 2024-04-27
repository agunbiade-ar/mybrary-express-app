const Book = require('../models/book.model');
const multer = require('multer');
const path = require('path');

const uploadPath = path.join('public', Book.coverImageBasePath);

const imageMimeTypes = ['images/jpeg', 'images/gif', 'images/png'];

const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, cb) => {
    cb(null, imageMimeTypes);
  },
});

module.exports.upload = upload;
module.exports.uploadPath = uploadPath;
