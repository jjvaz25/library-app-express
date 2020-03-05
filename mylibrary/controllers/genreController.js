const Genre = require('../models/genre');
 
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
exports.genre_detail = (req, res) => {
  res.send('NOT IMPLIMENTED: genre detail ' + req.params.id);
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