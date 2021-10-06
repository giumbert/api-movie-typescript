const {Genre, validate} = require('../models/genre');
const validateObjectId = require('../middleware/validateObjectId');
// const mongoose = require('mongoose');
import { Router, Request, Response } from 'express';
const router = Router();

router.route('/').get(async (req: Request, res: Response) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

// router.get('/:id', validateObjectId, async (req, res) => {
router.route('/:id').get(validateObjectId, async (req: Request, res: Response) => {
  
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }

  res.send(genre);
});

router.route('/').post(async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let genre = new Genre({ name: req.body.name });
  try {
    genre = await genre.save();
    // res.send(genre);
    res.send({genre, message: 'The genre was SAVED.'});

  } catch (err) {
    // for (const field in err.errors) {
    //   res.send(err.errors[field].message);
    // }
    res.send('Error to save the genre: '+err);
  }
});

// router.put('/:id', validateObjectId, async (req, res) => {
router.route('/:id').put(async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }
  // res.send(genre);
  res.send({genre, message: 'The genre was UPDATED.'});
});

// router.delete('/:id', validateObjectId, async (req, res) => {
router.route('/:id').delete(async (req: Request, res: Response) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }

  // res.send(genre);
  res.send({genre, message: 'The genre was DELETED.'});
});

export default router;
