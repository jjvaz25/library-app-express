const Book = require('../models/book');

exports.index = (req, res) => {
  res.send('NOT IMPLIMENTED: Site Home Page!!!');
};

//Display list of all book
exports.book_list = (req, res) => {
  res.send('NOT IMPLIMENTED: book list!!!!');
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