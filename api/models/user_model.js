import { findOneDocumentByName } from '../database';


class UserModel {
    constructor() {
        if (this.instance) return this.instance;
        UserModel.instance = this;
    }

    get() { return findOneDocumentByName("listingsAndReviews", "Infinite Views") }

}

export default new UserModel();