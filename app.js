const express = require('express')
const bodyParser = require('body-parser')

//---- Web Server
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }));

// routes
require('./api/routes/index')(app, {});

// Start the server
var server = app.listen(port, () => {
    console.log('PIM Xtreme Online RESTful API server started on: ' + port + " ... \n")
});
