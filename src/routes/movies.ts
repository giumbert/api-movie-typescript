const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const { Author } = require('../models/author');
import { Router, Request, Response } from 'express';
const router = Router();

router.route('/').get(async (req: Request, res: Response) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.route('/').post(async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const author = await Author.findById(req.body.authorId);
  if (!author) return res.status(400).send('Invalid author.');

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    author: {
      _id: author._id,
      name: author.name,
    },
  });

  try {
    movie = await movie.save();
    res.send({ movie, message: 'The movie was SAVED.' });
  } catch (err) {
    // for (field in err.errors) {
    //   res.send(err.errors[field].message);
    // }
    res.send('Error to save the movie: '+err);
  }

  // res.send(movie);
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const author = await Author.findById(req.body.authorId);
  if (!author) return res.status(400).send('Invalid author.');

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      author: {
        _id: author._id,
        name: author.name,
      },
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  // res.send(movie);
  res.send({ movie, message: 'The movie was UPDATED.' });
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  // res.send(movie);
  res.send({ movie, message: 'The movie was DELETED.' });
});

export default router;
