/**
 * Created by Inspiron on 8/30/2016.
 */

//var mongoose = require('mongoose')
//    , Schema = mongoose.Schema
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/kasper');
//var db = mongoose.connection;
//db.on('error', console.error);
db = require('./dbConnect'),
validator = require('./validateDB');


   // var userSchema = Schema({
   //     name: {type: String, required: true},
   //     prefix: String,
   //     users: String
   // });

   // var User = mongoose.model('User', userSchema);

    if(validator.insert("user1",["name", "prefix", "users"],["miren", "miren2002", "2555"]) == true){
        console.log("working");
    }else{
        console.log("not working");
    }

   // var aaron = new User({ name: 'kamal222', prefix: 'miren2005222', users: '1022' });



   // aaron.save(function(err) {
   //     if (err) return console.error(err);
   // });
