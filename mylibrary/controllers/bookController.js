const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

const async = require('async');
 
exports.index = (req, res) => {
  async.parallel({
    book_count: (callback) => {
      Book.countDocuments({}, callback);
    },
    book_instance_count: (callback) => {
      BookInstance.countDocuments({}, callback);
    },
    book_instance_available_count: (callback) => {
      BookInstance.countDocuments({status: 'Available'}, callback);
    },
    author_count: (callback) => {
      Author.countDocuments({}, callback);
    },
    genre_count: (callback) => {
      Genre.countDocuments({}, callback);
    }
  }, (err, results) => {
    res.render('index', {title: 'Local Library Home', error: err, data: results});
  });
};


//Display list of all book
exports.book_list = (req, res, next) => {
  Book.find({}, 'title author')
    .populate('author')
    .exec((err, list_books) => {
      if (err) { return next(err); }
      res.render('book_list', { title: 'Book List', book_list: list_books });
    });
};

//display detail page for specific book
exports.book_detail = (req, res) => {
  res.send('NOT IMPLIMENTED: book detail ' + req.params.id);
};

//display book create form on GET
exports.book_create_get = (req, res) => {
  res.send('NOT IMPLIMENTED: book create GET');
};

//Handle book create on POST
exports.book_create_post = (req, res) => {
  res.send('NOT IMPLIMENTED: book create POST');
};

//display book delete form on GET
exports.book_delete_get = (req, res) => {
  res.send('NOT IMPLIMENTED: book delete GET');
};

//handle author delete on POST
exports.book_delete_post = (req, res) => {
  res.send('NOT IMPLIMENTED: Author delete POST');
};

//Display book update for on GET
exports.book_update_get = (req, res) => {
  res.send('NOT IMPLIMENTED: book update GET');
};

//handle book update for on POST
exports.book_update_post = (req, res) => {
  res.send('NOT IMPLIMENTED: book update POST');
};