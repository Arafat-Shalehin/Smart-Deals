const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Vqjr3otAMhwon6an

const uri = "mongodb+srv://SmartDealsDBUser:Vqjr3otAMhwon6an@crud-server.b5xdndi.mongodb.net/?appName=Crud-Server";

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

    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
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

    app.get('/bids/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await bidsCollection.findOne(query);
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