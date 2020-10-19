// ENV 
require('dotenv').config()

// Dependency imports
const express = require('express');
const bodyParser = require('body-parser');

// App initialization
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Route imports and config

// Server start
app.listen(port, () => {
	console.log("Server listening on PORT:%s", port);
});
