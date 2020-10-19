// ENV 
require('dotenv').config()

// Dependency imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// App initialization
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Route imports and config

// Database connection
mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(
	() => console.log("MongoDB connected")
).catch(
  err => console.log("Connection unsuccesful. Error: " + err.toString())
);

// Server start
app.listen(port, () => {
	console.log("Server listening on PORT:%s", port);
});
