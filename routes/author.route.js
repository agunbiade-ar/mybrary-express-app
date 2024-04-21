const express = require('express');
const router = express.Router();

const {
  all_authors_get,
  new_author_get,
  new_author_post,
} = require('../controllers/author.controller');

router.get('/', all_authors_get);
router.get('/new', new_author_get);
router.post('/new', new_author_post);

module.exports.authorRouter = router;
