const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(cors()); 

// Define the base URL and headers for the Bayut API
const bayutBaseUrl = 'https://bayut.p.rapidapi.com/properties/list';
const rapidAPIKey = 'd379af89cfmsh58a700c036dea78p173c92jsnc63569905d5f';

// Function to create options for the API request
const createOptions = (locationExternalIDs, purpose, hitsPerPage) => ({
  method: 'GET',
  url: bayutBaseUrl,
  params: {
    locationExternalIDs,
    purpose,
    hitsPerPage,
  },
  headers: {
    'X-RapidAPI-Key': rapidAPIKey,
    'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
  },
});

// Route handler for fetching properties for sale
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
