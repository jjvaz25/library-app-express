const Author = require('../models/author');
const async = require('async');
const Book = require('../models/book');

//Display list of all authors
exports.author_list = (req, res, next) => {
  Author.find()
    .populate('author')
    .sort([['family_name', 'ascending']])
    .exec((err, list_authors) => {
      if (err) { return next(err); }
      res.render('author_list', {title: 'Author List', author_list: list_authors});
    });
};

//display detail page for specific author
exports.author_detail = (req, res, next) => {
  async.parallel({
    author: (callback) => {
      Author.findById(req.params.id)
        .exec(callback)
    },
    authors_books: (callback) => {
      Book.find({ 'author': req.params.id }, 'title summary')
        .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) };
    if(results.author==null) {
      let err = new Error('Author not found');
      err.status = 404;
      return next(err);
    }
    res.render('author_detail', {
      title: 'Author Detail',
      author: results.author,
      author_books: results.authors_books
    });
  });
};


//display author create form on GET
exports.author_create_get = (req, res) => {
  res.send('NOT IMPLIMENTED: Author create GET');
};

//Handle author create on POST
exports.author_create_post = (req, res) => {
  res.send('NOT IMPLIMENTED: Author create POST');
};

//display author delete form on GET
exports.author_delete_get = (req, res) => {
  res.send('NOT IMPLIMENTED: Author delete GET');
};

//handle author delete on POST
exports.author_delete_post = (req, res) => {
  res.send('NOT IMPLIMENTED: Author delete POST');
};

//Display author update for on GET
exports.author_update_get = (req, res) => {
  res.send('NOT IMPLIMENTED: Author update GET');
};

//handle author update for on POST
exports.author_update_post = (req, res) => {
  res.send('NOT IMPLIMENTED: Author update POST');
};