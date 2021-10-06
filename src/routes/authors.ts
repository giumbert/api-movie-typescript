const {Author, validate} = require('../models/author');
const validateObjectId = require('../middleware/validateObjectId');
import { Router, Request, Response } from 'express';
const router = Router();

router.route('/').get(async (req: Request, res: Response) => {
  const authors = await Author.find().sort('name');
  res.send(authors);
});

router.route('/:id').get(validateObjectId, async (req: Request, res: Response) => {
  
  const author = await Author.findById(req.params.id);
  if (!author) {
    return res.status(404).send('The author with the given ID was not found.');
  }

  res.send(author);
});

router.route('/').post(async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let author = new Author({ name: req.body.name });
  try {
    author = await author.save();
    res.send({author, message: 'The author was SAVED.'});

  } catch (err) {
    res.send('Error to save the author: '+err);
  }
});

router.route('/:id').put(validateObjectId, async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const author = await Author.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!author) {
    return res.status(404).send('The author with the given ID was not found.');
  }
  res.send({author, message: 'The author was UPDATED.'});
});

router.route('/:id').delete(validateObjectId, async (req: Request, res: Response) => {
  const author = await Author.findByIdAndRemove(req.params.id);
  if (!author) {
    return res.status(404).send('The author with the given ID was not found.');
  }

  res.send({author, message: 'The author was DELETED.'});
});

export default router;
