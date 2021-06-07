class Database {

    constructor() {

        if (this.instance) return this.instance

        Database.instance = this

        const { MongoClient } = require('mongodb')
        const url = 'mongodb+srv://ahmadelraqab:123123258Aa@cluster0.whjky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

        this.client = new MongoClient(url, { useUnifiedTopology: true });
        this.dbName = "sample_airbnb"

        try {
            async() => {
                await client.connect();
            }

        } catch (error) {

            console.error(error)

        } finally {
            async() => {
                await client.close();
            }

        }

    }


    async create(collection, document) {
        const result = await this.client.db(this.dbName).collection(collection).insertOne(document);
        return result
    }
    async createMultiple(collection, document) {
        const result = await this.client.db(this.dbName).collection(collection).insertMany(document);
        return result
    }
    async findOneDocumentByName(collection, document) {
        const result = await this.client.db(this.dbName).collection(collection).findOne({ name: document });
        return result
    }
    async findOneDocumentById(collection, documentId) {
        const result = await this.client.db(this.dbName).collection(collection).findOne({ _id: documentId });
        return result
    }
    async updateDocumentByName(collection, docName, document) {
        const result = await this.client.db(this.dbName).collection(collection)
            .updateOne({ name: docName }, { $set: document });
        return result
    }
    async upsertDocumentByName(collection, docName, document) {
        const result = await this.client.db(this.dbName).collection(collection)
            .updateOne({ name: docName }, { $set: document }, { upsert: true });

        return result
    }
    async deleteDocumentByName(collection, docName) {
        const result = await this.client.db(this.dbName).collection(collection)
            .deleteOne({ name: docName });
        return result
    }

}

module.exports = Database;