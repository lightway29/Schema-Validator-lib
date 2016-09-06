db = require('./DBManager'),
validator = require('./validator');

    if(validator.insert("user",["name", "prefix", "users"],["miren", "miren2002", "2999999"]) == true){
        console.log("working");
    }else{
        console.log("not working");
    }
