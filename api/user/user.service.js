'use strict';

import moment from "moment";

const users = [];

class UserService {
    constructor() {
        let nextId = 1;
        while (nextId <= 100) {
            users.push({
                id: nextId,
                name: 'User Name ' + nextId,
                email: 'user-email-name' + nextId + '@test.com',
                createdAt: '2016-12-29'
            });
            nextId++;
        }
    }

    findAll(cb) {
        let returnUsers = users;

        return cb(null, returnUsers)
    }
}

export default new UserService();

