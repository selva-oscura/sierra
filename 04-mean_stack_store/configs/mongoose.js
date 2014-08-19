var mongoose = require('mongoose');  //this is the mongoose MODULE.
var fs = require('fs'); 

// Bootstrap db connection
// Connect to mongodb server
var connect = function () {
	var options = { server: { socketOptions: { keepAlive: 1 } } }
	//the url segment aftr localhost will be the name of your MongoDB database
	mongoose.connect('mongodb://localhost/sierra_04', options)
}
connect();

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err)
})

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
  connect();
})

// The code below will take all files from the models folder in our project and require them.  Meaning that each model file
// will in turn create a Mongoose model that will allow us to perform database operations using the schemas defined in the 
// model files!  
// This is just a variable that holds the path to the models folder.  __Dirname is a default Express variable,
// console.log it to see what it holds!
var models_path = __dirname + '/../public/models';
console.log(__dirname);

// the forEach function should look familiar.  fs.readdirSync SYNChronously reads the files contained in the directory 
// we want (the model's folder).  The benefit of the synchronicity is that we don't have to have a callback!
fs.readdirSync(models_path).forEach(function (file) {
  //the the file exists, require it (a.k.a. import the model for us to use)
  if (~file.indexOf('.js')) require(models_path + '/' +  file)
})