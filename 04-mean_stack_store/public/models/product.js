var mongoose = require('mongoose');
// define the schema, i.e. the structure of how the MongoDB collections should look.  Using schemas allows all of the 
// documents within the same collection to have the same key names!  Hooray organization!

// Validations and validation messages
var ProductSchema = new mongoose.Schema({
  name: { type: String, unique:true, trim:true, required: 'Product Name is required.' },
  description: {type: String, trim:true, required: 'Product Description is required.'},
  img_url: {type: String, trim:true, required: 'URL for image is required.'},
  quantity: {type: Number, required: 'Quantity of this product is required.'},
  created: { type: Date, default: Date.now }
});
// Mongoose documentation (http://mongoosejs.com/docs/api.html#schematype_SchemaType-required) specifies that violating
// the unique constraint returns an E11000 error from MongoDB when saving, not a Mongoose validation error

// The line below takes all of our schema's information and constructs the actual Product model that will be used
// as an intermediary between the app and the MongoDB database. 
mongoose.model('Product', ProductSchema);