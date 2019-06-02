const Group = require('../models/group')
const User = require('../models/user')
const { userRepository, groupRepository } = require('../repositories')
exports.create = async (req, res, next) => {
    try {
        const loginUserId = req.user._id;
        console.log(loginUserId);
        const { members } = req.body;
        const options = {
            where: { _id: { $in: members }}
        }
        const ismember = await userRepository.getAll(options)
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
exports.getAllGroup = async (req, res, next) => {
   try {
        const options = {
            populate:[
                {
                    path: 'author',
                    select: 'username'
                },
                {
                    path: 'members',
                    select: 'username'
                }
            ],
            select: '_id'
        }
        const group = await groupRepository.getAll(options);
        if(!group.length) {
            return next(new Error('Group not found!'));
        }
        return res.status(200).json({
            group
        });
   } catch (e) {
       return next(e);
   }
};
exports.getOneGroup = async (req, res, next) => {
    try {
        const options = {
            where: { _id: req.params.id },
            populate:[
                {
                    path: 'author',
                    select: 'username'
                },
                {
                    path: 'members',
                    select: 'username'
                }
            ],
            select: '_id'
        }
        const group = await groupRepository.getOne(options);
        if (!group) {
            return next(new Error('Group not found!'));
        }
        return res.status(200).json({
            group
        });
    } catch (e) {
        console.log(e);
        return next(e);
    };

};
exports.deleteGroup = async (req, res, next) => {
    try {
        // groupId = req.params.id;
        // group = await Group.findByIdAndDelete({_id: groupId});
        // console.log(group);
        const optionsGroup = {
            where: {
              _id: req.params.id,
              author: req.user._id
            },
            data: { $set: { deleteAt: new Date() }},
          };
        const group = await groupRepository.findOneAndUpdate(optionsGroup);
        console.log(group)
        if(!group) {
            return next(new Error('Group not found'));
        }
        return res.status(200).json({
            message: 'delete group  successfully'
        });
    } catch (e) {
        return next(e);
    };
};
exports.updateGroup = async (req, res, next) => {
    try {
        // const  members  = req.body.members;
        //   const ismember = await User.find(). where({ _id: { $in: members }}).select('_id')
        //   console.log(ismember)
        //   if (ismember.length < members.length) {
        //       return next(new Error('mebers not user '));
        //   }
        const options = {
            where: {
                _id: req.params.id,
                author: req.user.id
            },
            data: { $set: req.body },
            lean: true
        }
        const group = await groupRepository.findOneAndUpdate(options);
        if (!group) {
        return next(new Error('Group not found'));
        }
        return res.status(200).json({
            message: 'update Group successfully'
        });
    } catch (e) {
        return next(e);
    };
};
exports.addMembers = async (req, res, next) => {
    try {
        const memberAdd = req.body.members;
        const _id = req.params.id;
        const group = await Group.findById(_id).select('author members')
        if(!group) {
            return next(new Error('Group not found'));
        }
        const ismemberExist = await Group.findById(_id).where({
            members: { $in: memberAdd }
        }).select('_id');
        if (ismemberExist) {
            return next(new Error('Members added is already existed in this group!'));
        }
        group.members = group.members.concat(memberAdd);
        await group.save();
        return res.status(200).json({
            message: 'memberAdd successfully',
            group
        });
    } catch (e) {
        return next(e);
    };
};