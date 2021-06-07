const { MongoClient } = require('mongodb')


async function main() {

    // Connection URL
    const url = 'mongodb+srv://ahmadelraqab:123123258Aa@cluster0.whjky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    // Database Name
    const client = new MongoClient(url, { useUnifiedTopology: true });
    // Use connect method to connect to the server

    try {
        await client.connect();

        await listDatabases(client)
    } catch (error) {

        console.error(error)

    } finally {
        await client.close();

    }
}

main().catch(console.error)


async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases()

    console.log("Databases: ")
    databasesList.databases.forEach(element => {
        console.log(element.name)
    });
}