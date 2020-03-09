const Genre = require('../models/genre');
const Book = require('../models/book');
const async = require('async');
const validator = require('express-validator');

 
//Display list of all genre
exports.genre_list = (req, res, next) => {
  Genre.find()
    .sort([['name', 'ascending']])
    .exec((err, list_genre) => {
      if (err) { return next(err); }
      res.render('genre_list', {title: 'Genre List', genre_list: list_genre})
    })
};

//display detail page for specific genre
exports.genre_detail = (req, res, next) => {
  async.parallel({
    genre: (callback) => {
      Genre.findById(req.params.id)
        .exec(callback);
    },
    genre_books: (callback) => {
      Book.find({
        'genre': req.params.id
      }).exec(callback);
    }  
  }, (err, results) => {
    if (err) { return next(err); }
    if (results.genre==null) {
      let err = new Error('Genre not found');
      err.status = 404;
      return next(err);
    }
    res.render('genre_detail', { 
      title: 'Genre Detail',
      genre: results.genre,
      genre_books: results.genre_books
    });
  });
};

//display genre create form on GET
exports.genre_create_get = (req, res, next) => {
  res.render('genre_form', { title: 'Create Genre' });
};

//Handle genre create on POST
exports.genre_create_post = [
  validator.body('name', 'Genre name required').trim().isLength({ min: 1 }),
  validator.sanitizeBody('name').escape(),
  (req, res, next) => {
    const errors = validator.validationResult(req);
    let genre = new Genre(
      { name: req.body.name }
    );
    if (!errors.isEmpty()) {
      res.render('genre_form', {
        title: 'Create Genre',
        genre: genre,
        errors: errors.array()
      });
    } else {
      Genre.findOne({ 'name': req.body.name })
        .exec((err, found_genre) => {
          if (err) { return next(err) };
          if (found_genre) {
            res.redirect(found_genre.url);
          } else {
            genre.save((err) => {
              if (err) { return next(err) };
              res.redirect(genre.url);
            });
          }
        });
    }
  }
];

//display genre delete form on GET
exports.genre_delete_get = (req, res, next) => {
  async.parallel({
    genre: (callback) => {
      Genre.findById(req.params.id).exec(callback)
    },
    genres_books: (callback) => {
      Book.find({ 'genre': req.params.id }).exec(callback)
    },
  }, (err, results) => {
    if(err) { return next(err); }
    if (results.genre==null) {
      res.redirect('/catalog/genres');
    }
    res.render('genre_delete', {
      title: 'Delete Genre',
      genre: results.genre,
      genre_books: results.genres_books
    });
  });
};

//handle genre delete on POST
exports.genre_delete_post = (req, res, next) => {
  async.parallel({
    genre: (callback) => {
      Genre.findById(req.body.genreid).exec(callback)
    },
    genres_books: (callback) => {
      Book.find({'genre': req.body.genreid}).exec(callback)
    },
  }, (err, results) => {
    if(err) { return next(err); }
    if(results.genre == null){
      res.redirect('/catalog/genres');
      return;
    }
    if(results.genres_books.length > 0) {
      res.render('genre_delete', {
        title: 'Delete Genre:', 
        genre: results.genre, 
        genre_books: results.genres_books
      });
      return;
    }
    Genre.findByIdAndRemove(req.body.genreid, function deleteGenre(err) {
      if(err) {return next(err); }
      //success
      res.redirect('/catalog/genres');
    });
  });
};

//Display genre update for on GET
exports.genre_update_get = (req, res, next) => {
  Genre.findById(req.params.id)
    .exec((err, genre) => {
      if(err) { return next(err); }
      res.render('genre_form', { title: 'Update Genre', genre: genre });
    })
};

//handle genre update for on POST
exports.genre_update_post = [
  validator.body('name', 'Genre name required').trim().isLength({ min: 1 }),
  validator.sanitizeBody('name').escape(),
  (req, res, next) => {
    const errors = validator.validationResult(req);
    let genre = new Genre({
      name: req.body.name,
      _id: req.params.id
    });
    if(!errors.isEmpty()) {
      res.render('genre_form', { 
        title: 'Create Genre', 
        genre: genre, 
        errors: errors.array() 
      });
      return;
    } else {
    Genre.findOne({ 'name': req.body.name })
      .exec((err, found_genre) => {
        if (err) { return next(err); }
        if (found_genre) {
          res.redirect(found_genre.url);
        } else {
          Genre.findByIdAndUpdate(req.params.id, genre, {}, (err) => {
            if(err) { return next(err); }
            res.redirect(genre.url);
          });
        }
      });
    }
  }
]