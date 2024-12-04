const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
// middleware

app.use(cors());
app.use(express.json());
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.gu1cm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("coffee");
    const userCollection = database.collection("coffeeData");
    app.post("/data", async (req, res) => {
      const receivedData = req.body; // Access the data sent in the request body
      const result = await userCollection.insertOne(receivedData);
      res.send(result);
      console.log("Received data:", receivedData);
    });

    app.get("/coffee", async (req, res) => {
      const coffees = await userCollection.find();
      const result = await coffees.toArray();

      res.send(result);
    });
    app.delete("/coffee/:id", async(req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result)


    });
    app.get('/coffee/:id',async(req,res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result)
    })
    app.put('/coffee/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateCoffee = req.body;
    
      console.log(updateCoffee);
    
      const coffee = {
        $set: {
          coffeeName: updateCoffee.coffeeName,
          coffeeType: updateCoffee.coffeeType,
          roastLevel: updateCoffee.roastLevel,
          imageUrl: updateCoffee.imageUrl, // Changed from updateCoffee.name to updateCoffee.imageUrl
          details: updateCoffee.details,
        }
      };
    
      try {
        const result = await userCollection.updateOne(query, coffee, { upsert: true });
        res.send(result);
      } catch (error) {
        console.error('Error updating coffee:', error);
        res.status(500).send('Error updating coffee');
      }
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Coffe makeing server is runing ");
});

// Start the server

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
