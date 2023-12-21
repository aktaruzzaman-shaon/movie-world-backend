const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000

app.use(cors());
app.use(express.json())

// mongodb integration---------------------------

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://movie-world:M4bmyeUbwFC05qJz@movie-world-1.02rq3mc.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version-----------------------

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        // mongodb connection-----------------
        client.connect();

        // db collections---------------------
        const videoData = client.db('movie').collection('videoData');

        // video url post request ------------
        app.post('/videoUrl', async (req, res) => {
            const url = req.body;
            const result = await videoData.insertOne(url)
            res.send(result)
        })

        //all movie reques-------------------
        app.get('/allmovie', async (req, res) => {
            const cursor =  videoData.find({})
            const result = await cursor.toArray();
            console.log(result)
            res.send(result);
        })

        


    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("running movie")
})

app.get('*', (req, res) => {
    res.send("no router found , 404")
})
app.listen(PORT, () => {
    console.log('Server is running')
})




