# server-Red-triangle-
# Red Triangle

## Overview
Red Triangle is a comprehensive web application designed for the sale and rental of properties. The project utilizes modern web technologies to deliver an efficient and scalable solution for real estate transactions. 

## Features
- Fetch a list of properties
- View detailed property information
- Auto-complete search suggestions
- Add new properties to the database
- Retrieve all properties from the database
- Delete properties from the database

## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- Axios
- Cors
- Body-Parser
- Bayut API (RapidAPI)

## Installation

### Prerequisites
- Node.js
- PostgreSQL

### Setup
1. Clone the repository:
    ```sh
    git clone https://git@github.com:Red-Triangle-Project/server-Red-triangle-.git
    cd server-Red-triangle-
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set up PostgreSQL:
    - Create a database.
    - Update the `dbUrl` in the code with your PostgreSQL connection string.

4. Run the server:
    ```sh
    node server.js
    ```

## API Endpoints

### Property Endpoints

#### Fetch Property List
- **URL:** `/properties/list`
- **Method:** `GET`
- **Query Parameters:**
  - `locationExternalIDs` (required)
  - `purpose` (optional)
  - `hitsPerPage` (optional)
- **Response:** JSON object containing the list of properties.

#### Fetch Property Details
- **URL:** `/properties/detail`
- **Method:** `GET`
- **Query Parameters:**
  - `externalID` (required)
- **Response:** JSON object containing detailed information about a property.

#### Auto-complete
- **URL:** `/auto-complete`
- **Method:** `GET`
- **Query Parameters:**
  - `query` (required)
  - `hitsPerPage` (optional)
  - `page` (optional)
  - `lang` (optional)
- **Response:** JSON object containing auto-complete suggestions.

### Database Endpoints

#### Add Property
- **URL:** `/addProperty`
- **Method:** `POST`
- **Body Parameters:**
  - `name` (required)
  - `image` (required)
  - `price` (required)
  - `details` (required)
- **Response:** JSON object of the newly added property.

#### Get All Properties
- **URL:** `/getProperty`
- **Method:** `GET`
- **Response:** JSON array of all properties in the database.

#### Delete Property
- **URL:** `/deleteProperty/:id`
- **Method:** `DELETE`
- **Route Parameters:**
  - `id` (required)
- **Response:** Success message upon successful deletion.

## Running the Application
Start the server using:
```sh
node server.js
```

## Feel free to contact with us 
`"https://github.com/Red-Triangle-Project"`
