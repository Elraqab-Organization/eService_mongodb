const database = require('../database');


class ProposalModel {
    constructor() {
        if (this.instance) return this.instance;
        ProposalModel.instance = this;
    }


}

module.exports = new ProposalModel();