const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = 5000

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://PowerXGym:PowerXGym@cluster0.ki0s6.mongodb.net/powerxgym?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('Hello World!')
})


client.connect(err => {
  const classCollection = client.db("powerxgym").collection("classes");
  const pricingCollection = client.db("powerxgym").collection("pricing");
  // perform actions on the collection object
  app.get("/AllClacess", (req, res) => {
      classCollection.find()
      .toArray((err, result) => {res.send(result)})
  })
  app.get("/AllPrices", (req, res) => {
    pricingCollection.find()
      .toArray((err, result) => {res.send(result)})
  })
});



app.listen(process.env.port || port, () => {
  console.log(`${port} is running`)
})
