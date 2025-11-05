const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

const admin = require("firebase-admin");

const serviceAccount = require("./smart-deals-firebase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Middleware
app.use(cors());
app.use(express.json());

const logger = (req, res, next) => {
  console.log("Logging info");
  next();
}

const verifyFirebaseToken = async (req, res, next) => {
  console.log("In the verify middleware", req.headers.authorization);
  if(!req.headers.authorization){
    return res.status(401).send({message: 'unauthorized access'})
  }
  const token = req.headers.authorization.split(' ')[1]
  if(!token){
    return res.status(401).send({message: 'unauthorized access'})
  }

  try {
    const userInfo = await admin.auth().verifyIdToken(token);
    req.token_email = userInfo.email;
    console.log('After token validation',userInfo);
    next();
  } catch{
    return res.status(401).send({message: 'unauthorized access'})
  }
}

const verifyJWTToken = (req, res, next) => {
  console.log('In middleware',req.headers);

  const authorization = req.headers.authorization;
  if(!authorization) {
    return res.status(401).send({message: 'unauthorized access'})
  }
  const token = authorization.split(' ')[1];
  if(!token){
    return res.status(401).send({message: 'unauthorized access'})
  }

  jwt.verify(token, process.env.JWT_SECRET,(err, decoded) => {
    if(err){
      return res.status(401).send({message: 'unauthorized access'});
    }

    req.token_email = decoded.email;
    next();
  })

}

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

    // Jwt related APIs

    app.post('/getToken', async (req, res) => {
      const loggedUser = req.body;
      const token = jwt.sign(loggedUser, process.env.JWT_SECRET, {expiresIn: '1h'});
      res.send({token: token})
    })

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
    app.get('/bids', logger, verifyFirebaseToken, verifyJWTToken, async(req, res) => {

      console.log('Headers', req.headers);

      const email = req.query.email;
      const query = {}
      if(email) {
        if(email !== req.token_email) {
          return res.status(403).send({message: 'forbidden access'})
        }
        query.buyer_email = email
      }

      const cursor = bidsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/products/bids/:productId', verifyFirebaseToken, async(req, res) => {
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

    // app.get('/bids', async (req, res) => {
    //   const query = {}
    //   if (query.email) {
    //     query.buyer_email = email;
    //   }
    //   const cursor = bidsCollection.find(query);
    //   const result = await cursor.toArray();
    //   res.send(result);
    // })

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