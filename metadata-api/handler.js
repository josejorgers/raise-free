const { MongoClient, ObjectId } = require('mongodb');

const addHeaders = (config) => ({
  ...config,
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Credentials': true,
  }
})

const findDocuments = async (event, context, callback) => {
    const { MONGODB_URL, MONGODB_DB_NAME, MONGODB_COLLECTION_NAME } = process.env;
    
    let client;
    try {
      client = await MongoClient.connect(MONGODB_URL);
      const db = client.db(MONGODB_DB_NAME);
      const collection = db.collection(MONGODB_COLLECTION_NAME);
  
      // Find documents in the collection that match the event
      const result = await collection.find(JSON.parse(`${event.body}`)).toArray();
  
      callback(null, addHeaders({
        statusCode: 200,
        body: JSON.stringify({ message: 'Success', result }),
      }));
    } catch (error) {
      console.error(error);
      callback(null, addHeaders({
        statusCode: 500,
        body: JSON.stringify({ message: 'Error', error: error.message }),
      }));
    } finally {
      if (client) {
        client.close();
      }
    }
};

const createDocument = async (event, context, callback) => {
    const { MONGODB_URL, MONGODB_DB_NAME, MONGODB_COLLECTION_NAME } = process.env;

    let client;
    try {
        client = await MongoClient.connect(MONGODB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        const db = client.db(MONGODB_DB_NAME);
        const collection = db.collection(MONGODB_COLLECTION_NAME);

        // Insert a new document into the collection
        const result = await collection.insertOne(JSON.parse(`${event.body}`));

        callback(null, addHeaders({
          statusCode: 200,
          body: JSON.stringify({ message: 'Success', result }),
        }));
    } catch (error) {
        console.error(error);
        callback(null, addHeaders({
          statusCode: 500,
          body: JSON.stringify({ message: 'Error', error: error.message }),
        }));
    } finally {
        if (client) {
        client.close();
        }
    }
};

const updateDocument = async (event, context, callback) => {
    const { MONGODB_URL, MONGODB_DB_NAME, MONGODB_COLLECTION_NAME } = process.env;

    
    let client;
    try {
        client = await MongoClient.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        const db = client.db(MONGODB_DB_NAME);
        const collection = db.collection(MONGODB_COLLECTION_NAME);

        const body = JSON.parse(`${event.body}`)
        const docId = new ObjectId(body._id)
        delete body._id
        
        // Insert a new document into the collection
        const result = await collection.updateOne({_id: docId}, {$set: {
            ...body
        }});

        callback(null, addHeaders({
          statusCode: 200,
          body: JSON.stringify({ message: 'Success', result }),
        }));
    } catch (error) {
        console.error(error);
        callback(null, addHeaders({
          statusCode: 500,
          body: JSON.stringify({ message: 'Error', error: error.message }),
        }));
    } finally {
        if (client) {
          client.close();
        }
    }
};

module.exports = { 
    findDocuments, 
    createDocument,
    updateDocument
};
