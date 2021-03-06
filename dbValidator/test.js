/**
 * Created by Inspiron on 9/15/2016.
 */
exports.insertDeviceAPI1 = function insertDeviceAPI1(collection,document,data) {

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
                //console.log(eval("jsonContent."+collection+"."+key));
                //console.log(jsonContent.user.dob.year);
                for (var innerKey in eval("jsonContent."+collection+"."+key)) {
                    console.log("mm"+key+"."+innerKey);
                    if (key+"."+innerKey === document[i]) {
                        record += ' "' + document[i] + '": "' + data[i] + '",';
                        schemaRecord += ' "' + document[i] + '": "' + eval("jsonContent." + collection + "." + document[i]) + '",';
                        console.log("kk"+schemaRecord);
                        val = true;
                    }
                }
                console.log("ss"+key);
                if (key === document[i]) {
                    console.log("mm"+key);
                    record += ' "' + document[i] + '": "' + data[i] + '",';
                    schemaRecord += ' "' + document[i] + '": "' + eval("jsonContent." + collection + "." + document[i]) + '",';
                    val = true;
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

exports.deleteDeviceAPI1 = function deleteDeviceAPI1(collection,document,data) {

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

        object.findOne(eval(JSON.parse(data)),{multi: true}, function (error, data){
            console.log(data + "\nDocument is deleted successfully");
            data.remove();

        });
    }
}

