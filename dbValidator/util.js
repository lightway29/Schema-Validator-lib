db = require('./DBManager'),
validator = require('./validator');

    var info = {"user": {
                    "name": "miren2222222222",
                    "prefix": "miren2002",
                    "users": "2999999",
                    "dob" : {
                        "year" : "2016",
                        "month" : "12",
                        "date" : "29",
                    }
    }};

    /**if(validator.insertDeviceAPI(info) == true){
        console.log("working");
    }else{
        console.log("not working");
    }*/

    var deleteInfo = {"user": {
        "name": "mirenxyz"
        }
    };

    if(validator.deleteDeviceAPI(deleteInfo) == true){
          console.log("working");
    }else{
          console.log("not working");
    }

    /**if(validator.deleteDeviceAPI("user",["name"],["miren"]) == true){
          console.log("working");
    }else{
          console.log("not working");
    }*/

    /**if(validator.updateDeviceAPI("user",["name"],["kamal11"],["miren"]) == true){
        console.log("working");
    }else{
        console.log("not working");
    }*/