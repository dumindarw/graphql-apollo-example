const MONGO_URL="mongodb://causer_01:2GKD7CrW8LpUczOb@calamitaid-shard-00-00-odckz.mongodb.net:27017,calamitaid-shard-00-01-odckz.mongodb.net:27017,calamitaid-shard-00-02-odckz.mongodb.net:27017/calamataid_db?ssl=true&replicaSet=calamitaid-shard-0&authSource=admin&retryWrites=true";
const dbName = 'calamataid_db';

import {MongoClient} from "mongodb";

class Connection {

    async connect() {
        
        let client = MongoClient.connect(MONGO_URL,{ useNewUrlParser: true }).then( client =>{
            console.log("Connected successfully mongo server");
        
            return client.db(dbName);
        
            //client.close();
        })

        return client;
    }
}

class SingletonConnection {

    constructor() {
        if (!SingletonConnection.instance) {
            SingletonConnection.instance = new Connection();
        }
    }
  
    getInstance() {
        return SingletonConnection.instance;
    }
  
  }

export default SingletonConnection;