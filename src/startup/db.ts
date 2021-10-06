const mongoose = require('mongoose');

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_SCHEMA = process.env.MONGO_SCHEMA;

export async function connect() {
  const db = 'mongodb://' + MONGO_HOST + '/' + MONGO_SCHEMA;
  mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err: any) => console.error(`Could not connect to MongoDB... ${err}`));
}