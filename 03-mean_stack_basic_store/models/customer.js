var mongoose = require('mongoose');
// define the schema, i.e. the structure of how the MongoDB collections should look.  Using schemas allows all of the 
// documents within the same collection to have the same key names!  Hooray organization!

var validateEmail = function(email) {
	var re = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    return re.test(email)
};

// Validations and validation messages
var CustomerSchema = new mongoose.Schema({
  name: { type: String, unique: true, trim: true, required: 'Customer Name is required' },
  email: { type: String, unique: true, trim: true, required: 'E-mail address is required', validate: [validateEmail, 'Please provide a valid email address'] },
  created: { type: Date, default: Date.now }
});


// Mongoose documentation (http://mongoosejs.com/docs/api.html#schematype_SchemaType-required) specifies that violating
// the unique constraint returns an E11000 error from MongoDB when saving, not a Mongoose validation error

// The line below takes all of our schema's information and constructs the actual Customer model that will be used
// as an intermediary between the app and the MongoDB database. 
mongoose.model('Customer', CustomerSchema);