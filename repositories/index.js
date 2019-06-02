const UserRepository = require('./user-repository');
const GroupRepository = require('./group-repository')
const MessageRepository = require('./messages-repository');
module.exports = {
    userRepository: new UserRepository(),
    groupRepository: new GroupRepository(),
    messageRepository: new MessageRepository()
}