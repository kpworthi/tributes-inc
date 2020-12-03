require('dotenv').config();
const { MongoClient } = require('mongodb');

async function connection (callback) {
    const CONNECTION_STRING = process.env.CONNECTION_STRING;
    var client = new MongoClient(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
      await callback(client)
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
    }
  }

module.exports = connection;
