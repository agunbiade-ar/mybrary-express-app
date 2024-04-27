const Book = require('../models/book.model');

const indexController = async (req, res) => {
  let books;
  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec();
    res.render('index', { books });
  } catch (error) {
    books = [];
    console.log(error);
    res.render('index', { books });
  }
};

module.exports = {
  indexController,
};
