const Author = require('../models/author.model');
const handler = require('express-async-handler');

//all authors route
const all_authors_get = handler(async (req, res, next) => {
  let searchOptions = {};
  console.log(req.query);
  //a get request, sends to "req.query" string
  if (req.query.author != null && req.query.author !== '') {
    searchOptions.name = new RegExp(req.query.author, 'i');
  }
  const all_authors = await Author.find(searchOptions).exec();
  console.log(all_authors, searchOptions);
  res.render('authors/index', { all_authors, searchOptions: req.query });
});

//new author route
const new_author_get = (req, res, next) => {
  res.render('authors/new', { author: new Author() });
};

//create author route
const new_author_post = async (req, res, next) => {
  const author = new Author({
    name: req.body.author,
  });

  try {
    await author.save();
    res.redirect('/authors');
    console.log('created author successfully');
    // res.redirect(`/authors/${author._id}`);
  } catch (error) {
    console.log('an error occured: ' + error);
    res.render('authors/new', {
      author,
      errorMessage: 'Error creating Author',
    });
    return;
  }
};

module.exports = {
  all_authors_get,
  new_author_get,
  new_author_post,
};
