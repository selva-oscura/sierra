var mongoose = require('mongoose');
// define the schema, ie the structure of how we want our MongoDB collections to look.  Using schemas allows all of the 
// documents within the same collection to have the same key names!  Hooray organization!
var UserSchema = new mongoose.Schema({
  name:  String,
  email: String,
  date: { type: Date, default: Date.now }
});

// Using mongoose, we can also set up validations!  And validation messages!
UserSchema.path('name').required(true, 'User name cannot be blank');
UserSchema.path('email').required(true, 'User email cannot be blank');

// The line below takes all of our schema's information and constructs an actual User model that we can now use 
// as an intermediary between our app and our MongoDB database. 
mongoose.model('User', UserSchema);