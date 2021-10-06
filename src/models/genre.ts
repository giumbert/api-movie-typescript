import Joi from 'joi';
import mongoose from 'mongoose';
// const Joi = require('joi');
// const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const genreSchema = new Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre: any) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(genre);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;

// export default Genre;