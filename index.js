const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Vqjr3otAMhwon6an

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@crud-server.b5xdndi.mongodb.net/?appName=Crud-Server`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const db = client.db('smart_db');
    const productsCollection = db.collection('products');
    const bidsCollection = db.collection('bids');
    const usersCollection = db.collection('users');

    // Users APIS 
    app.post('/users', async(req, res) => {
      const newUsers = req.body;

      const email = req.body.email;
      const query = {email: email}
      const existingUser = await usersCollection.findOne(query);
      if(existingUser) {
        res.send({message: 'User already exits. Do not need to insert it again.'})
      }
      else{
        const result = await usersCollection.insertOne(newUsers);
        res.send(result);
      }
    })

    // Product APIS
    app.get('/products', async(req, res) => {

      const email = req.query.email;
      const query = {}
      if(email) {
        query.email = email
      }

      const cursor = productsCollection.find(query).sort({price_min: 1});
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/latest-products', async(req, res) => {
      const cursor = productsCollection.find().sort({created_at: -1}).limit(6);
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: (id)}
      const result = await productsCollection.findOne(query);
      res.send(result);
    })

    app.post('/products', async(req, res) => {
      const newProduct = req.body;
      const result = await productsCollection.insertOne(newProduct);
      res.send(result);
    })

    app.patch('/products/:id', async (req, res) => {
      const id = req.params.id;
      const updatedProduct = req.body;
      const query = {_id: new ObjectId(id)}
      const update = {
        $set: {
          name: updatedProduct.name,
          price: updatedProduct.price
        }
      } 

      const result = await productsCollection.updateOne(query, update);
      res.send(result);
    })

    app.delete('/products/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    })

    // bids related apis
    app.get('/bids', async(req, res) => {

      const email = req.query.email;
      const query = {}
      if(email) {
        query.buyer_email = email
      }

      const cursor = bidsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/products/bids/:productId', async(req, res) => {
      const productId = req.params.productId;
      const query = {product: productId}
      const cursor = bidsCollection.find(query).sort({bid_price: 1})
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/bids/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await bidsCollection.findOne(query);
      res.send(result);
    })

    app.get('/bids', async (req, res) => {
      const query = {}
      if (query.email) {
        query.buyer_email = email;
      }
      const cursor = bidsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/bids', async(req, res) => {
      const newBids = req.body;
      const result = await bidsCollection.insertOne(newBids);
      res.send(result);
    })

    app.delete('/bids/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await bidsCollection.deleteOne(query);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Smart Sever is running on port ${port}`)
})