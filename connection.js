

import {MongoClient} from "mongodb";

class Connection {

    async connect() {
        
        let client = MongoClient.connect(process.env.MONGO_URL,{ useNewUrlParser: true }).then( client =>{
            console.log("Connected successfully mongo server");
        
            return client.db(process.env.DB_NAME);
        
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