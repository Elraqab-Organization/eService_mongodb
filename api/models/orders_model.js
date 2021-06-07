const database = require('../database');


class OrderModel {
    constructor() {
        if (this.instance) return this.instance;
        OrderModel.instance = this;
    }


}

module.exports = new OrderModel();