import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

export const connectMongodb = async () => {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  return client.db('store');
}
export const Store = mongoose.model('stores', {
  _id: mongoose.SchemaTypes.String,
  name: mongoose.SchemaTypes.String
});

export const Item = mongoose.model('items', {
  name: mongoose.SchemaTypes.String,
  quantity: mongoose.SchemaTypes.Number,
  price: mongoose.SchemaTypes.Number,
  store_id: mongoose.SchemaTypes.String,
});
// export const Store = mongoose.model('stores', {
//   _id: mongoose.Schema.Types.ObjectId,
//   name: mongoose.Schema.Types.String
// });

// export const Item = mongoose.model('items', {
//   _id: mongoose.Schema.Types.ObjectId,
//   name: mongoose.Schema.Types.String,
//   quantity: mongoose.Schema.Types.Number,
//   price: mongoose.Schema.Types.Number,
//   store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'stores' }
// });
