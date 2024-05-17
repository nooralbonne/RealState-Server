const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(cors()); 

const bayutBaseUrl = 'https://bayut.p.rapidapi.com/properties/list';
const detailUrl = 'https://bayut.p.rapidapi.com/properties/detail';
const rapidAPIKey = 'd379af89cfmsh58a700c036dea78p173c92jsnc63569905d5f';

const createOptions = (locationExternalIDs, purpose, hitsPerPage) => ({
  method: 'GET',
  url: bayutBaseUrl,
  params: { locationExternalIDs, purpose, hitsPerPage },
  headers: {
    'X-RapidAPI-Key': rapidAPIKey,
    'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
  },
});

const createDetailOptions = (externalID) => ({
  method: 'GET',
  url: detailUrl,
  params: { externalID },
  headers: {
    'X-RapidAPI-Key': rapidAPIKey,
    'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
  },
});

app.get('/properties/list', async (req, res) => {
  const { locationExternalIDs, purpose, hitsPerPage } = req.query;
  const options = createOptions(locationExternalIDs, purpose, hitsPerPage);

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
  const options = createDetailOptions(externalID);

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching property details:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
