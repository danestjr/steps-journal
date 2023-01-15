const express = require('express')
const app = express()
const port = 5000
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId
const path = ('path')

dotenv.config()

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use(express.static(
    path.join(__dirname, "../client/build")));


const client = new MongoClient(process.env.DB_CONNECT)
let collection = MongoConnect(client)

async function MongoConnect (client){
    try {
        const database = await client.db('walking-app')
        collection = await database.collection('walking')
    } catch(e) {
        alert(err)
    }
}

app.get('*', (req, res) => {
    res.sendFile(
        path.join(__dirname, "../client/build/index.html")
    );
});

app.post('/list', async (req, res) => {
    const result = await collection.find({user: req.body.user});
    const data = [];
    await result.forEach((doc) => {
        const obj = {
            "id": doc._id,
            "user": doc.user,
            "date": doc.date,
            "miles": doc.miles
        }
        data.push(obj)
    })
    res.json({data: data})
})

app.post('/add', async (req, res) => {
    const doc = { user: req.body.user, date: req.body.date, miles: req.body.miles }
    const result = await collection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.sendStatus(200)
})

app.delete('/delete', async (req, res) => {
    const search = { _id: ObjectId(req.body.id) }
    const deleteResult = await collection.deleteOne(search);
    if (deleteResult.deletedCount === 1) {
        console.log("Successfully deleted one document.")
        res.sendStatus(200)
    } else {
        console.log("No documents matched the query. Deleted 0 documents.")
        res.sendStatus(404)
    }
})

app.put('/update', async (req, res) => {
    console.log(req.body)
    const filter = { _id: ObjectId(req.body.id) }
    const replacementDocument = {
           user: req.body.user,
           date: req.body.date,
           miles: req.body.miles,
        };
    const result = await collection.replaceOne(filter, replacementDocument);
    console.log(result)
    if (result.modifiedCount){
        res.sendStatus(200)
    }else {
        console.log("There has been an error")
        res.sendStatus(404)
    }
})
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})