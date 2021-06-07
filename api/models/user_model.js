const database = require('../database');


class UserModel {
    constructor() {
        if (this.instance) return this.instance;
        UserModel.instance = this;
    }

    get() { return database.findOneDocumentByName("listingsAndReviews", "Infinite Views") }

}

module.exports = new UserModel();