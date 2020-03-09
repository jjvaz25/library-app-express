const BookInstance = require('../models/bookinstance');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const Book = require('../models/book');

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
exports.bookinstance_detail = (req, res, next) => {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec((err, bookinstance) => {
      if(err) { return next(err); }
      if(bookinstance==null) {
        let err = new Error('Book copy not found');
        err.status = 404;
        return next(err);
      }
      res.render('bookinstance_detail', {
        title: 'Copy: ' +bookinstance.book.title,
        bookinstance: bookinstance
      });
    });
};

//display bookinstance create form on GET
exports.bookinstance_create_get = (req, res, next) => {
  Book.find({}, 'title')
    .exec((err, books) => {
      if (err) { return next(err); }
      res.render('bookinstance_form', {
        title: 'Create Bookinstance',
        book_list: books
      });
    });
};

//Handle bookinstance create on POST
exports.bookinstance_create_post = [
  body('book', 'Book must be specified').trim().isLength({min:1}),
  body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }),
  body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),

  sanitizeBody('book').escape(),
  sanitizeBody('imprint').escape(),
  sanitizeBody('status').trim().escape(),
  sanitizeBody('due_back').toDate(),

  (req, res, next) => {
    const errors = validationResult(req);

    let bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back
    });

    if(!errors.isEmpty()) {
      Book.find({}, 'title')
        .exec((err, books) => {
          if(err) { return next(err); }
          res.render('bookinstance_form', {
            title: 'Create BookInstance',
            book_list: books,
            selected_book: bookinstance.book._id,
            errors: errors.array(),
            bookinstance: bookinstance
          });
        });
      return;
    } else {
      bookinstance.save((err) => {
        if(err) { return next(err); }
        res.redirect(bookinstance.url);
      });
    }
  }
];

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