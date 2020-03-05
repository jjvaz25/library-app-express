const BookInstance = require('../models/bookinstance');

//Display list of all bookinstances
exports.bookinstance_list = (req, res, next) => {
  BookInstance.find()
    .populate('book')
    .exec((err, list_bookinstances) => {
      if (err) { return next(err); }
      res.render('bookinstance_list', { title: 'Book Instance List', 
      bookinstance_list: list_bookinstances });
    });
};

//display detail page for specific bookinstance
exports.bookinstance_detail = (req, res) => {
  res.send('NOT IMPLIMENTED: bookinstance detail ' + req.params.id);
};

//display bookinstance create form on GET
exports.bookinstance_create_get = (req, res) => {
  res.send('NOT IMPLIMENTED: bookinstance create GET');
};

//Handle bookinstance create on POST
exports.bookinstance_create_post = (req, res) => {
  res.send('NOT IMPLIMENTED: bookinstance create POST');
};

//display bookinstance delete form on GET
exports.bookinstance_delete_get = (req, res) => {
  res.send('NOT IMPLIMENTED: bookinstance delete GET');
};

//handle bookinstance delete on POST
exports.bookinstance_delete_post = (req, res) => {
  res.send('NOT IMPLIMENTED: bookinstance delete POST');
};

//Display bookinstance update for on GET
exports.bookinstance_update_get = (req, res) => {
  res.send('NOT IMPLIMENTED: bookinstance update GET');
};

//handle bookinstance update for on POST
exports.bookinstance_update_post = (req, res) => {
  res.send('NOT IMPLIMENTED: bookinstance update POST');
};