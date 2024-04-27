const Book = require('../models/book.model');
const Author = require('../models/author.model');
const handler = require('express-async-handler');
const fs = require('fs');
const path = require('path');
const { uploadPath } = require('../config/multer_config');

function removeBookCover(filename) {
  fs.unlink(path.join(uploadPath, filename), (err) => {
    if (err) console.error(err);
  });
}

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({}).exec();
    const params = { authors, book };
    if (hasError) {
      params.errorMessage = 'Error Creating Book!';
      if (book.coverImageName != null) {
        removeBookCover(book.coverImageName);
      }
    }
    res.render('books/new', params);
  } catch (error) {
    console.log(error);
    res.redirect('/books');
  }
}

//all books route
const all_books_get = async (req, res, next) => {
  let query = Book.find();
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'));
  }

  if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
    query = query.lte('publishedDate', req.query.publishedBefore);
  }

  if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
    query = query.gte('publishedDate', req.query.publishedAfter);
  }

  try {
    const books = await query.exec();
    res.render('books/index', {
      books,
      searchOptions: req.query,
    });
  } catch (error) {
    console.log('error');
    res.redirect('/books');
  }
};

//new book route
const new_book_get = async (req, res, next) => {
  let book = new Book();
  renderNewPage(res, book);
};

//create book route
const new_book_post = async (req, res, next) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    publishedDate: new Date(req.body.publishedDate),
    pageCount: req.body.pageCount,
  });
  //if there's a file, get the filename, else the name is null
  const fileName = req.file != null ? req.file.filename : null;

  book.coverImageName = fileName + path.extname(req.file.originalname);

  try {
    await book.save();
    res.redirect(`/books`);
    // res.redirect(`books/${newBook._id}`)
  } catch (error) {
    console.log(error);
    renderNewPage(res, book, true);
  }
};

module.exports = {
  all_books_get,
  new_book_get,
  new_book_post,
};
