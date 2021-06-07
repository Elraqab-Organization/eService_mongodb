const database = require('../database');


class PostModel {
    constructor() {
        if (this.instance) return this.instance;
        PostModel.instance = this;
    }


}

module.exports = new PostModel();