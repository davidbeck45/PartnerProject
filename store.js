import { Router } from 'express';
import mongoose from 'mongoose';
import ItemsRouter from './items.js';
import { Store, Item } from './util.js';
import {v4 as uuidv4} from 'uuid';
const StoresRouter = Router();
ItemsRouter.mergeParams = true;
StoresRouter.use("/:store_id/items", ItemsRouter);



// GET /stores
StoresRouter.get('/', async (req, res) => {
  // try {
  //   const stores = await Store.find().exec();
  //   res.json(stores);
  // } catch (e) {
  //   console.log(e);
  //   res.status(500).send('Internal Server Error');
  // }
  // const directoryContents = await flushSync.readdir('storage/');
  // const StoreList = {
  //   myStores: [],
  // };

  // for (const entry of directoryContents){
  //   const contents = await flushSync.readfile('storage/${entry}');
  //   StoreList.posts.push(JSON.parse(contents));
  // }
  const StoresList = await Store.find();
  console.log(StoresList);
  res.send(StoresList);
});

// GET /stores/:store_id
StoresRouter.get('/:store_id', async (req, res) => {
  const store_id = req.params.store_id;

  try {
    const store = await Store.findById(store_id).exec();

    if (store === null) {
      res.status(404).json({ message: 'Store not found' });
      return;
    }

    res.json(store);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});

// POST /stores
StoresRouter.post('/new', async (req, res) => {
  const name  = req.body;
  console.log('req body: ', req.body);
  name._id = uuidv4();
  
  try {
    const store = await new Store(name).save();
    console.log(store);
    res.json({
      status: "201",
      message: 'created'
    });
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});

// GET /stores/:store_id/items
StoresRouter.get('/:store_id/items', async (req, res) => {
  const store_id = req.params.store_id;

  try {
    const items = await Item.find({ store_id }).exec();
    res.json(items);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});

// GET /stores/:store_id/items/:item_id
StoresRouter.get('/:store_id/items/:item_id', async (req, res) => {
  const { store_id, item_id } = req.params;

  try {
    const item = await Item.findOne({ _id: item_id, store_id }).exec();

    if (item === null) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    res.json(item);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});

// POST /stores/:store_id/items
StoresRouter.post('/:store_id/items', async (req, res) => {
  const { name, quantity, price } = req.body;
  const store_id = req.params.store_id;

  try {
    const item = new Item({ name, quantity, price, store_id });
    await item.save();

    res.json(item);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});

export default StoresRouter;
