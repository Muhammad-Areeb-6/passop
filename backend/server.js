const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { MongoClient } = require('mongodb');
const parseBody = require('body-parser');
const bodyParser = require('body-parser');
// or as an es module:
// import { MongoClient } from 'mongodb'

const app = express()
app.use(cors())
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passOp';
const port = 3000
app.use(bodyParser.json())
client.connect();


// get all the passwrods
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// save a password
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  const findResult = await collection.insertOne(password);
  res.send({seccuse: true})
})

// delete password
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  const findResult = await collection.deleteOne(password);
  res.send({seccuse: true})
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})