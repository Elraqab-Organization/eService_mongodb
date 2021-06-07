const database = require('../database');


class CategoryModel {
    constructor() {
        if (this.instance) return this.instance;
        CategoryModel.instance = this;
    }


}

module.exports = new CategoryModel();