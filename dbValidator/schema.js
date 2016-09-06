var mongoose = require( 'mongoose' )
    , Schema = mongoose.Schema

var userSchema = Schema({
    name: {type: String, required: true},
    prefix: String,
    users: String
});

var User = mongoose.model('User', userSchema);