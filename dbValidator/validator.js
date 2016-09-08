/**
 * Created by Inspiron on 8/29/2016.
 */

// Bring Mongoose into the app
var mongoose = require( 'mongoose')
    , Schema = mongoose.Schema;

// Define JSON File
var fs = require("fs");

//capitalize First Letter
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

exports.insertDeviceAPI = function insertDeviceAPI(collection,document,data) {

    var jasonFileName="./DeviceAPI/"+collection+"Sechema.json";
    // Get content from file
    var contents = fs.readFileSync(jasonFileName);
    // Define to JSON type
    var jsonContent = JSON.parse(contents);


    var json="jsonContent.";
    if (eval("jsonContent."+collection)  === undefined) {
        console.log("Invalid Collection :"+collection);
        return false;
    }else{
        var record="";
        var schemaRecord="";
        for (i = 0; i < document.length; i++) {
            var val=false;

            for (var key in eval("jsonContent."+collection)) {
                if(key === document[i]){
                    record+=' "'+document[i]+'": "'+data[i]+'",';
                    schemaRecord+=' "'+document[i]+'": "'+eval("jsonContent."+collection+"."+document[i])+'",';
                    val=true;
                }
            }
            if(val === false){
                console.log("Invalid Document :"+document[i]);
                return false;
            }
        }

        var data = "{ "+record.replace(/,\s*$/, "")+" }";

        //create db schema
        var schemaData = "{ "+schemaRecord.replace(/,\s*$/, "")+" }";
        var schemaVal = Schema(
            eval(JSON.parse(schemaData))
        );

        //create db schema model
        var object = mongoose.model(collection.capitalizeFirstLetter(),schemaVal);

        //insert data to db
        var value = new object(eval(JSON.parse(data)));
        value.save(function(err) {
             if (err) return console.error(err);
        });
        return true;
    }
}

exports.deleteDeviceAPI = function deleteDeviceAPI(collection,document,data) {

    var jasonFileName="./DeviceAPI/"+collection+"Sechema.json";
    // Get content from file
    var contents = fs.readFileSync(jasonFileName);
    // Define to JSON type
    var jsonContent = JSON.parse(contents);


    var json="jsonContent.";
    if (eval("jsonContent."+collection)  === undefined) {
        console.log("Invalid Collection :"+collection);
        return false;
    }else{
        var record="";
        var schemaRecord="";
        for (i = 0; i < document.length; i++) {
            var val=false;

            for (var key in eval("jsonContent."+collection)) {
                if(key === document[i]){
                    record+=' "'+document[i]+'": "'+data[i]+'",';
                    schemaRecord+=' "'+document[i]+'": "'+eval("jsonContent."+collection+"."+document[i])+'",';
                    val=true;
                }
            }
            if(val === false){
                console.log("Invalid Document :"+document[i]);
                return false;
            }
        }

        var data = "{ "+record.replace(/,\s*$/, "")+" }";
        //create db schema
        var schemaData = "{ "+schemaRecord.replace(/,\s*$/, "")+" }";
        var schemaVal = Schema(
            eval(JSON.parse(schemaData))
        );

        //create db schema model
        var object = mongoose.model(collection.capitalizeFirstLetter(),schemaVal);

        //object.remove(eval(JSON.parse(data))).exec();
        object.findOne(eval(JSON.parse(data)), function (error, data){
            console.log(data + "\nDocument is deleted successfully");
            data.remove();

        });
    }
}


exports.updateDeviceAPI = function updateDeviceAPI(collection,document,data) {

    var jasonFileName="./DeviceAPI/"+collection+"Sechema.json";
    // Get content from file
    var contents = fs.readFileSync(jasonFileName);
    // Define to JSON type
    var jsonContent = JSON.parse(contents);


    var json="jsonContent.";
    if (eval("jsonContent."+collection)  === undefined) {
        console.log("Invalid Collection :"+collection);
        return false;
    }else{
        var record="";
        var schemaRecord="";
        for (i = 0; i < document.length; i++) {
            var val=false;

            for (var key in eval("jsonContent."+collection)) {
                if(key === document[i]){
                    record+=' "'+document[i]+'": "'+data[i]+'",';
                    schemaRecord+=' "'+document[i]+'": "'+eval("jsonContent."+collection+"."+document[i])+'",';
                    val=true;
                }
            }
            if(val === false){
                console.log("Invalid Document :"+document[i]);
                return false;
            }
        }

        var data = "{ "+record.replace(/,\s*$/, "")+" }";
        //create db schema
        var schemaData = "{ "+schemaRecord.replace(/,\s*$/, "")+" }";
        var schemaVal = Schema(
            eval(JSON.parse(schemaData))
        );

        //create db schema model
        var object = mongoose.model(collection.capitalizeFirstLetter(),schemaVal);

        object.remove(eval(JSON.parse(data))).exec();
    }
}