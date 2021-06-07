const database = require('../database');


class FeedbackModel {
    constructor() {
        if (this.instance) return this.instance;
        FeedbackModel.instance = this;
    }

}

module.exports = new FeedbackModel();