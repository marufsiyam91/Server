const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://marufsiyam9123:${process.env.HOTEL_PASS}@hotelbooking.kxuruz8.mongodb.net/?retryWrites=true&w=majority&appName=HotelBooking`
;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const HotelCollection = client.db('Hotel_Server').collection('hotels')

    app.get('/hotels', async(req, res) => {
      const cursor = HotelCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/hotels/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await HotelCollection.findOne(query)
      res.send(result)
    });
    
    

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('server is running')
})


app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})