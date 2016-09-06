/**
 * Created by Inspiron on 8/29/2016.
 */

// Bring Mongoose into the app
var mongoose = require( 'mongoose' );
    User = mongoose.model('User');
// Define JSON File
var fs = require("fs");
// Get content from file
var contents = fs.readFileSync("mongoDB.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);

exports.insert = function insert(collection,document,data) {
    var json="jsonContent.";
    if (eval("jsonContent."+collection)  === undefined) {
        console.log("Invalid Collection :"+collection);
        return false;
    }else{
        var record="";
        for (i = 0; i < document.length; i++) {
            var val=false;

            for (var key in eval("jsonContent."+collection)) {
                if(key === document[i]){
                    record+=' "'+document[i]+'": "'+data[i]+'",';
                    val=true;
                }
            }
            if(val === false){
                console.log("Invalid Document :"+document[i]);
                return false;
            }
        }
        //console.log("db."+collection+".insert"+"( {"+record.replace(/,\s*$/, "")+"} )");
        var data = "{ "+record.replace(/,\s*$/, "")+" }";
        var value = new User(eval(JSON.parse(data)));

        value.save(function(err) {
             if (err) return console.error(err);
        });
        return true;
    }
}