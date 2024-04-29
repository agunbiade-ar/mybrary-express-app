const express = require('express');
const router = express.Router();
// const upload = require('../config/multer_config').upload;

const {
  all_books_get,
  new_book_get,
  new_book_post,
} = require('../controllers/book.controller');

router.get('/', all_books_get);
router.get('/new', new_book_get);
router.post('/new', new_book_post);

module.exports.bookRouter = router;
