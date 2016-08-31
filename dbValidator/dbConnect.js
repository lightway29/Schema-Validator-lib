/**
 * Created by Inspiron on 8/30/2016.
 */

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/kasper');
var db = mongoose.connection;

db.on('error', console.error);


    db.once('open', function () {
        // Create your schemas and models here.
        var userSchema = new mongoose.Schema({
            name: {type: String, required: true},
            prefix: String,
            users: String
        });

        // Compile model using the Schema as the structure.
        // Mongoose also creates a MongoDB collection for documents.
        var User = mongoose.model('User', userSchema);

        var user = new User({
            name: 'miren'
            , prefix: 'miren2002'
            , users: '9'
        });

        //user.save(function (err, user) {
        //    if (err) return console.error(err);
        //    console.dir(user);

        //});

        var aaron = new User({ name: 'kamal', prefix: 'miren2005', users: '10' });

        aaron.save(function (err) {
            if (err) return handleError(err);
        });


    });




