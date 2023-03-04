# MERN Contact List

This is a sample project that demonstrates how to build a contact list application using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, view, update, and delete contact entries.

## Features

- Create, view, update, and delete contact entries
- Search for contacts by name or phone number
- Sort contacts by name or phone number

## Installation

1. Clone the repository

git clone https://github.com/your-username/contact-list-mern.git


2. Install dependencies

cd contact-list-mern
npm install


3. Set up environment variables

Create a `.env` file in the root directory of the project and set the following environment variables:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-contact-list


4. Start the server

npm start



The server will start at `http://localhost:5000`for node and `http://localhost:3000` for react.

## Usage

Once the server is running, you can use the following endpoints to manage contacts:

- `GET /get-contactList` - get all contacts
- `GET /search?q={"any keyword available on a contact"}` - get contacts by searching
- `POST /add-contact` - create a new contact
- `PUT /modify-contact` - update an existing contact by id
- `DELETE /delete-contact` - delete a contact by id

You can also use the search on the frontend React app.

## Technologies Used

- MongoDB - database
- Express - web framework
- React - frontend framework
- Node.js - runtime environment



## Credits

This project was created by [khalil227](https://github.com/khalil227).



