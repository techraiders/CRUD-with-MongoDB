const { Movie, validate } = require('../models/movie'),
  { Genre } = require('../models/genre'),
  mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();
  res.status(200).send({
    status: 'ok',
    statusCode: 200,
    message: 'Movies was saved successfully',
    id: movie._id,
  });
});

module.exports = router;