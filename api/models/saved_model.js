const database = require('../database');


class SavedModel {
    constructor() {
        if (this.instance) return this.instance;
        SavedModel.instance = this;
    }


}

module.exports = new SavedModel();