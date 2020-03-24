const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "taskDetails";
require('dotenv/config');

const state = {
    db : null
};

const connect = (cb) =>{
    if(state.db)
        cb();
    else{
        // attempt to get database connection
        MongoClient.connect(process.env.DB_CONNECTION,{useNewUrlParser : true},(err,client)=>{
            // unable to get database connection pass error to CB
            if(err)
                cb(err);
                // Successfully got our database connection
            // Set database connection and call CB
            else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

// returns OBJECTID object used to
const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}

// returns database connection
const getDB = ()=>{
    return state.db;
}

module.exports = {getDB,connect,getPrimaryKey};