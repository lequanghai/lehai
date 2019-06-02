const Message = require('../models/messages');
const Group = require('../models/group')
const  { messageRepository, groupRepository } = require('../repositories');
exports.create = async (req, res, next) => {
    try {
        const author = req.user._id;
        const { messages, group } = req.body;
        const member = await groupRepository.get({ //check the user is exist in this group ??
          where: {
            _id: group,
            author: { $in: members }
          }
        });
        if (!member) {
          return next(new Error('You is not exist in this group!'));
        }
  
        const message = messageRepository.create({ author, messages, group });
        await message.save();
        
        await groupRepository.findOneAndUpdate({ _id: group }, { lastMessage: message._id });
        return res.status(200).json({
            message: 'Create new messages successfully',
            messages
        });
    } catch (e) {
        return next(e);
    }
}