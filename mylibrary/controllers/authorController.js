const Author = require('../models/author');

//Display list of all authors
exports.author_list = (req, res) => {
  res.send('NOT IMPLIMENTED: Author list');
};

//display detail page for specific author
exports.author_detail = (req, res) => {
  res.send('NOT IMPLIMENTED: Author detail ' + req.params.id);
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