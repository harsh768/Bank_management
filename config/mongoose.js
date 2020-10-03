//require library
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/bank_development', {useNewUrlParser: true});

//acquire the connection to check if running
const db = mongoose.connection;

//if error print it
db.on('error', console.error.bind(console, 'connection error connecting to mongodb:'));

//up and running print message
db.once('open', function() {
  console.log('Successfully connected to db')
});

module.exports= db;