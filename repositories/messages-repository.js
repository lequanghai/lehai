const Message = require('../models/messages');
const BaseRepository = require('./base-repository');

module.exports = class MessageRepository extends BaseRepository {
    constructor() {
        super(Message);
    }
}