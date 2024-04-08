// 
const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path'); 
const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));


const url = "mongodb+srv://vivekolladapu5:vivek12345@cluster0.b1rc26m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = 'Modal_form_data';
const client = new MongoClient(url, { useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
client.connect(function(err) {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      return;
    }
    console.log('Connected successfully to MongoDB');
  });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  const database = client.db('Modal_form_data');
  const m = database.collection('card_items');
  app.get('/get-cards', async (req, res) => {
    try {
      
      const items = await m.find().toArray();
      console.log(items);
      res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.post('/submit-form', async (req, res) => {
    try {
      
      await m.insertOne(req.body);
        console.log('Data inserted');
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

