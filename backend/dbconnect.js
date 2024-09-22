const { MongoClient, ServerApiVersion } = require('mongodb');

const username = encodeURIComponent('akashinde');
const password = encodeURIComponent('Stud@FraUas2022');

const uri = `mongodb+srv://${username}:${password}@cluster0.4fpm820.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let client = null;

async function getClient() {
  if (client && client.topology.isConnected()) {
    return client;
  }

  client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1
  });

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});

module.exports = { getClient };