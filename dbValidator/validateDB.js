/**
 * Created by Inspiron on 8/29/2016.
 */

var User = require('./db');

// Define JSON File
var fs = require("fs");
console.log("\n *STARTING* \n");
// Get content from file
var contents = fs.readFileSync("mongoDB.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);
// Get Value from JSON
console.log("name:", jsonContent.user.name1);
console.log("prefix:", jsonContent.user.prefix);
console.log("dob:", jsonContent.user);
console.log("\n *EXIT* \n");

insert("user",["name", "prefix", "users"],["miren", "miren2002", "2"]);

function insert(collection,document,data) {
    var json="jsonContent.";
    console.log(document.length);
    if (eval("jsonContent."+collection)  === undefined) {
        console.log("false888");
        return false;
    }else{
        console.log("\n *false* \n");


        var record="";
        for (i = 0; i < document.length; i++) {
            console.log(document[i]);
            var val=false;

            for (var key in eval("jsonContent."+collection)) {
                if(key === document[i]){
                    record+= document[i]+': "'+data[i]+'",';
                    val=true;
                }
            }
            if(val === false){
                console.log("false777");
                return false;
            }

        }
        console.log("db."+collection+".insert"+"( { "+record.replace(/,\s*$/, "")+"} )");

        //eval("db."+collection+".insert"+"( { "+record.replace(/,\s*$/, "")+"} )");



        return true;



    }
}





///db.contacts.insert( { name: "Amanda", status: "Updated" } )