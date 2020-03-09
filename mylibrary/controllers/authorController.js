const Author = require('../models/author');
const async = require('async');
const Book = require('../models/book');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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
exports.author_create_get = (req, res, next) => {
  res.render('author_form', { title: 'Create Author' });
};

//Handle author create on POST
exports.author_create_post = [
  body('first_name').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  body('family_name').isLength({min:1}).trim().withMessage('Family name must be specified')
  .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
  body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

  sanitizeBody('first_name').escape(),
  sanitizeBody('family_name').escape(),
  sanitizeBody('date_of_birth').toDate(),
  sanitizeBody('date_of_death').toDate(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('author_form', {
        title: 'Create Author',
        author: req.body,
        errors: errors.array()
      });
      return;
    } else {
      let author = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
      });
      author.save((err) => {
        if (err) { return next(err); }
        res.redirect(author.url);
      })
    }
  }
]


//display author delete form on GET
exports.author_delete_get = (req, res, next) => {
  async.parallel({
    author: (callback) => {
      Author.findById(req.params.id).exec(callback)
    },
    authors_books: (callback) => {
      Book.find({ 'author': req.params.id }).exec(callback)
    },
  }, (err, results) => {
    if(err) { return next(err); }
    if (results.author==null) {
      res.redirect('/catalog/authors');
    }
    res.render('author_delete', {
      title: 'Delete Author',
      author: results.author,
      author_books: results.authors_books
    });
  });
};

//handle author delete on POST
exports.author_delete_post = (req, res, next) => {
  async.parallel({
    author: (callback) => {
      Author.findById(req.body.authorid).exec(callback)
    },
    authors_books: (callback) => {
      Book.find({ 'author': req.body.authorid }).exec(callback)
    },
  }, (err, results) => {
    if (err) { return next(err); }
    if (results.authors_books.length > 0) {
      res.render('author_delete', { 
        title: 'Delete Author', 
        author: results.author, 
        author_books: 
        results.authors_books 
      });
      return;
    } else {
      Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
        if (err) { return next(err); }
        res.redirect('/catalog/authors')
      })
    }
  });
};

//Display author update for on GET
exports.author_update_get = (req, res, next) => {
  Author.findById(req.params.id)
    .exec((err, author) => {
      if(err) { return next(err); }
      res.render('author_form', {title: 'Update Author', author: author });
    });
};

//handle author update for on POST
exports.author_update_post = [
  body('first_name').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  body('family_name').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
    .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
  body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

  sanitizeBody('first_name').escape(),
  sanitizeBody('family_name').escape(),
  sanitizeBody('date_of_birth').toDate(),
  sanitizeBody('date_of_death').toDate(),

  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.render('author_form', { 
        title: 'Update Author!', 
        author: req.body, 
        errors: errors.array()
      });
      return;
    } else {
      let author = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
        _id: req.params.id
      })
      Author.findByIdAndUpdate(req.params.id, author, {}, (err) => {
        if(err) { return next(err); }
        res.redirect(author.url);
      });
    }
  }
];