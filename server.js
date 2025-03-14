const express = require('express');
const bodyParser = require('body-parser'); //
const cors = require('cors');
const axios = require('axios');
const { Client } = require('pg');
const app = express();
require('dotenv').config();


// Use cors middleware for handling cross-origin requests
app.use(cors());
// Use express.json() middleware to parse JSON bodies
app.use(express.json());
//bodyParser
app.use(bodyParser.json());

//const dbUrl = 'postgres://btnaiatj:zrcWc6U_XYdMwiL2HCe4_kxWV6D2fCpk@bubble.db.elephantsql.com/btnaiatj';
//const dbUrl = `postgresql://triangle_real_state_user:iWv5YEgHbfbjRVjkLAnEwjmszAlY4Xfx@dpg-cv9md65ds78s73bqkhkg-a.oregon-postgres.render.com/triangle_real_state`


const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
});
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Fetch properties
const bayutBaseUrl = 'https://bayut.p.rapidapi.com/properties/list';
const detailUrl = 'https://bayut.p.rapidapi.com/properties/detail';
const autoCompleteUrl = 'https://bayut.p.rapidapi.com/auto-complete';
//const rapidAPIKey = 'bf49742b06msh3ebf5dbb1739bcfp1a4e11jsnccdff129a557';

const createOptions = (url, params) => ({
  method: 'GET',
  url,
  params,
  headers: {
    'X-RapidAPI-Key': process.env.rapidAPIKey, // Corrected the syntax here
    'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
  },
});


app.get('/properties/list', async (req, res) => {
  const { locationExternalIDs, purpose, hitsPerPage } = req.query;
  const options = createOptions(bayutBaseUrl, { locationExternalIDs, purpose, hitsPerPage });
  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching property data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/properties/detail', async (req, res) => {
  const { externalID } = req.query;
  const options = createOptions(detailUrl, { externalID });
  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching property details:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/auto-complete', async (req, res) => {
  const { query, hitsPerPage, page, lang } = req.query;
  const options = createOptions(autoCompleteUrl, { query, hitsPerPage, page, lang });
  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching auto-complete data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Routes
app.post('/addProperty', addPropertyHandler);
app.get('/getProperty', getPropertyHandler);
app.delete('/deleteProperty/:id', deletePropertyHandler);


async function addPropertyHandler(req, res) {
  console.log('Received request:', req.body);

  if (!req.body) {
    console.error('Request body is missing');
    return res.status(400).send('Request body is missing');
  }

  const { name, image, price, details } = req.body;

  if (!name || !image || !price || !details) {
    console.error('Missing required fields', { name, image, price, details });
    return res.status(400).send('Missing required fields');
  }

  const sql = `INSERT INTO properties(name, image, price, details) VALUES ($1, $2, $3, $4) RETURNING *;`;
  const values = [name, image, price, details];

  try {
    const result = await client.query(sql, values);
    console.log('Insert result:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ message: 'Server error' });

  }
}



async function getPropertyHandler(req, res) {
  const sql = 'SELECT * FROM properties';
  try {
    const result = await client.query(sql);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).send('Error fetching data');
  }
}

async function deletePropertyHandler(req, res) {
  const id = req.params.id;
  const sql = 'DELETE FROM properties WHERE id=$1;';
  const values = [id];
  try {
    await client.query(sql, values);
    res.send('Successfully deleted');
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).send('Error deleting data');
  }
}

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
