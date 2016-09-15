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

var indent = "";
var depth = 0;
var parentArray=[];
var documentArray=[];
var documentFullArray=[];
var dataArray=[];
function iterate(obj) {

    for (var property in obj) {

        if (obj.hasOwnProperty(property) && depth < 5) {

            if (typeof obj[property] == "object" ) {

                console.log(indent + property + "   " + obj[property]);
                parentArray.push(indent+property);
                indent= indent+ property +".";

                ++depth;

                iterate(obj[property]);
            } else {
                if(indent==""){
                    console.log("Error :No Collection");
                    return false;
                }
                    documentArray.push(property);
                    documentFullArray.push(indent + property);
                    dataArray.push(obj[property]);
                    console.log( indent + property  +"   " + obj[property]);
            }

        }else{
            console.log("Invalid Depth");
            return false;
        }
    }
    var splitVal = indent.split(".");
    var splitIndent="";
    --depth;
    for(var k=0 ; k < splitVal.length-2 ;k++){
        splitIndent=splitIndent+"."+splitVal[k];
    }

    while(splitIndent.charAt(0) === '.')
        splitIndent = splitIndent.substr(1);
    indent=splitIndent+".";

}


exports.insertDeviceAPI = function insertDeviceAPI(strJSON) {
    iterate(strJSON);

    var jasonFileName="./DeviceAPI/"+parentArray[0]+"Schema.json";

    if (!fs.existsSync(jasonFileName)) {
        console.log(parentArray[0]+' Schema dose not exist');
        return false;
    }

    // Get content from file
    var contents = fs.readFileSync(jasonFileName);
    // Define to JSON type
    var jsonContent = JSON.parse(contents);

    var json="jsonContent.";
    if (eval("jsonContent."+parentArray[0])  === undefined) {
        console.log("Invalid Collection :"+parentArray[0]);
        return false;
    }else{
        var record="";
        var schemaRecord="";
        for (i = 1; i < parentArray.length; i++) {
            if (eval("jsonContent."+parentArray[i])  === undefined) {
                console.log("Invalid Document :"+parentArray[i]);
                return false
            }
        }
        for (i = 0; i < documentFullArray.length; i++) {
            console.log(documentFullArray[i]);
            if (eval("jsonContent." + documentFullArray[i]) === undefined) {
                console.log("Invalid Document :"+documentFullArray[i]);
                return false
            }else{
                record += ' "' + documentArray[i] + '": "' + dataArray[i] + '",';
                schemaRecord += ' "' + documentArray[i] + '": "' + eval("jsonContent." + documentFullArray[i]) + '",';
            }
        }

        var data = "{ "+record.replace(/,\s*$/, "")+" }";

        //create db schema
        var schemaData = "{ "+schemaRecord.replace(/,\s*$/, "")+" }";
        var schemaVal = Schema(
            eval(JSON.parse(schemaData))
        );

        //create db schema model
        var object = mongoose.model(parentArray[0].capitalizeFirstLetter(),schemaVal);

        //insert data to db
        var value = new object(eval(JSON.parse(data)));
        value.save(function(err) {
            if (err) return console.error(err);
        });
        return true;
    }
}

exports.deleteDeviceAPI = function deleteDeviceAPI(strJSON) {

    iterate(strJSON);

    var jasonFileName="./DeviceAPI/"+parentArray[0]+"Schema.json";

    if (!fs.existsSync(jasonFileName)) {
        console.log(parentArray[0]+' Schema dose not exist');
        return false;
    }



    // Get content from file
    var contents = fs.readFileSync(jasonFileName);
    // Define to JSON type
    var jsonContent = JSON.parse(contents);

    var json="jsonContent.";
    if (eval("jsonContent."+parentArray[0])  === undefined) {
        console.log("Invalid Collection :"+parentArray[0]);
        return false;
    }else{
        var record="";
        var schemaRecord="";
        for (i = 1; i < parentArray.length; i++) {
            if (eval("jsonContent."+parentArray[i])  === undefined) {
                console.log("Invalid Document :"+parentArray[i]);
                return false
            }
        }
        for (i = 0; i < documentFullArray.length; i++) {
            console.log(documentFullArray[i]);
            if (eval("jsonContent." + documentFullArray[i]) === undefined) {
                console.log("Invalid Document :"+documentFullArray[i]);
                return false
            }else{
                record += ' "' + documentArray[i] + '": "' + dataArray[i] + '",';
                schemaRecord += ' "' + documentArray[i] + '": "' + eval("jsonContent." + documentFullArray[i]) + '",';
            }
        }

        var data = "{ "+record.replace(/,\s*$/, "")+" }";

        //create db schema
        var schemaData = "{ "+schemaRecord.replace(/,\s*$/, "")+" }";
        var schemaVal = Schema(
            eval(JSON.parse(schemaData))
        );

        //create db schema model
        var object = mongoose.model(parentArray[0].capitalizeFirstLetter(),schemaVal);

        //fined value and delete data from db
        object.find(eval(JSON.parse(data))).remove(function (error, data){
            if(error){
                throw error;
                return false;
            }else{
                console.log(data + "\nDocument is deleted successfully");
                return true;
            }
        });
    }
}

exports.updateDeviceAPI = function updateDeviceAPI(collection,document,searchValue,data) {

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
        var findRecord="";
        var schemaRecord="";
        for (i = 0; i < document.length; i++) {
            var val=false;

            for (var key in eval("jsonContent."+collection)) {
                if(key === document[i]){
                    record+=' "'+document[i]+'": "'+data[i]+'",';
                    findRecord+=' "'+document[i]+'": "'+searchValue[i]+'",';
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
        var findData = "{ "+findRecord.replace(/,\s*$/, "")+" }";
        //create db schema
        var schemaData = "{ "+schemaRecord.replace(/,\s*$/, "")+" }";
        var schemaVal = Schema(
            eval(JSON.parse(schemaData))
        );

        //create db schema model
        var object = mongoose.model(collection.capitalizeFirstLetter(),schemaVal);

        object.update(eval(JSON.parse(findData)), eval(JSON.parse(data)), {multi: true},
            function(err, num){
                if(err){
                    throw err;
                }
                console.log(num);
            })
    }
}


exports.selectDeviceAPI = function selectDeviceAPI(collection,document,searchValue,data) {

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
        var findRecord="";
        var schemaRecord="";
        for (i = 0; i < document.length; i++) {
            var val=false;

            for (var key in eval("jsonContent."+collection)) {
                if(key === document[i]){
                    record+=' "'+document[i]+'": "'+data[i]+'",';
                    findRecord+=' "'+document[i]+'": "'+searchValue[i]+'",';
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
        var findData = "{ "+findRecord.replace(/,\s*$/, "")+" }";
        //create db schema
        var schemaData = "{ "+schemaRecord.replace(/,\s*$/, "")+" }";
        var schemaVal = Schema(
            eval(JSON.parse(schemaData))
        );

        //create db schema model
        var object = mongoose.model(collection.capitalizeFirstLetter(),schemaVal);

        object.update(eval(JSON.parse(findData)), eval(JSON.parse(data)), {multi: true},
            function(err, num){
                if(err){
                    throw err;
                }
                console.log(num);
            })
    }
}