const Genre = require('../models/genre');
const Book = require('../models/book');
const async = require('async');
 
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

//display author create form on GET
exports.genre_create_get = (req, res) => {
  res.send('NOT IMPLIMENTED: Author create GET');
};

//Handle genre create on POST
exports.genre_create_post = (req, res) => {
  res.send('NOT IMPLIMENTED: genre create POST');
};

//display genre delete form on GET
exports.genre_delete_get = (req, res) => {
  res.send('NOT IMPLIMENTED: genre delete GET');
};

//handle genre delete on POST
exports.genre_delete_post = (req, res) => {
  res.send('NOT IMPLIMENTED: genre delete POST');
};

//Display genre update for on GET
exports.genre_update_get = (req, res) => {
  res.send('NOT IMPLIMENTED: genre update GET');
};

//handle genre update for on POST
exports.genre_update_post = (req, res) => {
  res.send('NOT IMPLIMENTED: genre update POST');
};