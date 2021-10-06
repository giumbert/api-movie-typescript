import Joi from 'joi';
import mongoose from 'mongoose';
// const Joi = require('joi');
// const mongoose = require('mongoose');
const { genreSchema } = require('./genre');
const { authorSchema } = require('./author');

const Movie = mongoose.model(
  'Movies',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    author: {
      type: authorSchema,
      required: true,
    },
  })
);

function validateMovie(movie: any) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().alphanum().required(),
    authorId: Joi.string().alphanum().required(),
  });

  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
