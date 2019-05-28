const Group = require('../models/group')
const User = require('../models/user')
exports.create = async (req, res, next) => {
    try {
        const loginUserId = req.user._id;
        const { members } = req.body;
        const ismember = await User.find(). where({ _id: { $in: members }}).select('_id')
        console.log(ismember)
        if (ismember.length < members.length) {
            return next(new Error('user not found'));
        }
        const isUserlogin = members.includes(loginUserId)
        if ( !isUserlogin ) {
            members.unshift(loginUserId)
            //members.push(loginUserId)
        }
        const group = new Group ({
            ...req.body,
            members,
            type: members.length < 2 ? 'individual':'group'
        })
        if (group.type === 'individual') {
          return next(new Error('This invidiual group is exist!'));
        }
        group.author = loginUserId;
        const savedGroup = await group.save();
        return res.status(200).json({
            message: 'Create new group successfully',
            savedGroup
        });
    } catch (e) {
        return next(e);
    }
};