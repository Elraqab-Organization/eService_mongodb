const database = require('../database');


class SearchModel {
    constructor() {
        if (this.instance) return this.instance;
        ServiceProviderModel.instance = this;
    }


}

module.exports = new ServiceProviderModel();