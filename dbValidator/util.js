db = require('./DBManager'),
validator = require('./validator');

    /**if(validator.insertDeviceAPI("user",["name", "prefix", "users"],["miren", "miren2002", "2999999"]) == true){
        console.log("working");
    }else{
        console.log("not working");
    }*/

    /**if(validator.deleteDeviceAPI("user",["name"],["miren"]) == true){
          console.log("working");
    }else{
          console.log("not working");
    }*/

    if(validator.updateDeviceAPI("user",["name"],["miren"],["kasun"]) == true){
        console.log("working");
    }else{
        console.log("not working");
    }