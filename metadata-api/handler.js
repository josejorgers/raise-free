const { MongoClient, ObjectId } = require('mongodb');

const findDocuments = async (event, context, callback) => {
    const { MONGODB_URL, MONGODB_DB_NAME, MONGODB_COLLECTION_NAME } = process.env;
    
    const query = JSON.parse(`${event.body}`);
    
    let client;
    try {
      client = await MongoClient.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const db = client.db(MONGODB_DB_NAME);
      const collection = db.collection(MONGODB_COLLECTION_NAME);
  
      // Find documents in the collection that match the query
      const result = await collection.find(query).toArray();
  
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success', result }),
      });
    } catch (error) {
      console.error(error);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error', error: error.message }),
      });
    } finally {
      if (client) {
        client.close();
      }
    }
};

const createDocument = async (event, context, callback) => {
    const { MONGODB_URL, MONGODB_DB_NAME, MONGODB_COLLECTION_NAME } = process.env;

    const document = JSON.parse(`${event.body}`);

    let client;
    try {
        client = await MongoClient.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        const db = client.db(MONGODB_DB_NAME);
        const collection = db.collection(MONGODB_COLLECTION_NAME);

        // Insert a new document into the collection
        const result = await collection.insertOne(document);

        callback(null, {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success', result }),
        });
    } catch (error) {
        console.error(error);
        callback(null, {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error', error: error.message }),
        });
    } finally {
        if (client) {
        client.close();
        }
    }
};

const updateDocument = async (event, context, callback) => {
    const { MONGODB_URL, MONGODB_DB_NAME, MONGODB_COLLECTION_NAME } = process.env;

    const document = JSON.parse(`${event.body}`);

    let client;
    try {
        client = await MongoClient.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        const db = client.db(MONGODB_DB_NAME);
        const collection = db.collection(MONGODB_COLLECTION_NAME);

        const docId = new ObjectId(document._id)
        delete document._id
        
        // Insert a new document into the collection
        const result = await collection.updateOne({_id: docId}, {$set: {
            ...document
        }});

        callback(null, {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success', result }),
        });
    } catch (error) {
        console.error(error);
        callback(null, {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error', error: error.message }),
        });
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
