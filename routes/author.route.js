const express = require('express');
const router = express.Router();

const {
  all_authors_get,
  new_author_get,
  new_author_post,
  get_single_author,
  get_edit_author,
  update_author,
  delete_author,
} = require('../controllers/author.controller');

router.get('/', all_authors_get);
router.get('/new', new_author_get);
router.post('/new', new_author_post);
router.get('/:id', get_single_author);
router.get('/:id/edit', get_edit_author);
router.put('/:id', update_author);
router.delete('/:id', delete_author);

module.exports.authorRouter = router;
