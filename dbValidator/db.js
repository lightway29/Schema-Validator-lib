/**
 * Created by Inspiron on 8/30/2016.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/kasper');
var db = mongoose.connection;
db.on('error', console.error);


    var userSchema = Schema({
        name: {type: String, required: true},
        prefix: String,
        users: String
    });

    var User = mongoose.model('User', userSchema);

    var aaron = new User({ name: 'kamal222', prefix: 'miren2005222', users: '1022' });

    aaron.save(function(err) {
        if (err) return console.error(err);
    });



module.exports.User = User;
