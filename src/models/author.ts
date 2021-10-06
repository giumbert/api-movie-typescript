import Joi from 'joi';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const authorSchema = new Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Author = mongoose.model('Author', authorSchema);

function validateAuthor(author: any) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(author);
}

exports.authorSchema = authorSchema;
exports.Author = Author;
exports.validate = validateAuthor;