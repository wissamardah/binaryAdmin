const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var https = require('https');
var fs = require('fs');

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb'}));

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
    /*var err = new Error('Not Found');
     err.status = 404;
     next(err);*/
  
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  
  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    // Pass to next layer of middleware
    next();
  });
const router = require('./routes/router.js');
app.use('/api', router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));