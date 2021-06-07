const database = require('../database');


class RequestModel {
    constructor() {
        if (this.instance) return this.instance;
        RequestModel.instance = this;
    }


}

module.exports = new RequestModel();