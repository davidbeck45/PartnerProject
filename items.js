import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { connectMongodb } from './util.js';

const ItemsRouter = Router();

// Get all items for a given store
ItemsRouter.get('/', async (req, res) => {
  try {
    const db = await connectMongodb();
    const storeId = req.params.store_id;
    const items = await db.collection('items').find({ store_id: storeId }).toArray();
    res.json(items);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal server error');
  }
});

// Get a single item by its ID
ItemsRouter.get('/item_id', async (req, res) => {
  try {
    const db = await connectMongodb();
    const itemId = req.params.item_id;
    const item = await db.collection('items').findOne({ _id: itemId });
    if (!item) {
      res.status(404).send('Item not found');
      return;
    }
    res.json(item);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal server error');
  }
});

// Create a new item for a given store
ItemsRouter.post('/new', async (req, res) => {
  try {
    const db = await connectMongodb();
    const storeId = req.params.store_id;
    const item = {
      _id: uuidv4(),
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      store_id: storeId
    };
    await db.collection('items').insertOne(item);
    res.status(201).json(item);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal server error');
  }
});

export default ItemsRouter;
