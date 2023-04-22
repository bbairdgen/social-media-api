const { ObjectID } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models')

module.exports = {
    // Get All Users
    async getUsers(req, res) {
        try {
            const users = await User.find()

            res.json(users)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },

    // Get a Single User by _id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('friends')
                .populate('thoughts')

            if (!user) {
                return res.status(404).json({ message: 'No user found.' })
            }

            res.json(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },

    // Post a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body)
            res.json(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }

    },

    // Put to update current user by _id
    async updateUser(req, res) {
        try {
            console.log(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            if (!user) {
                return res.status(404).json({ message: 'No User found.' })
            }

            res.json(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }

    },

    // Delete to remove user by _id
    async deleteUser(req, res) {
        try {
            const user = User.deleteOne({ _id: req.params.userId }).then((dbmodel) => res.json(dbmodel))

            if (!user) {
                return res.status(404).json({ message: 'No user found' })
            }

            res.json({ message: 'User has been deleted.' })
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }

    },

    //  /user/:userID/friends/:friendId
    // Post to add new friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true }
            )

            if (!user) {
                return res.status(404).json('No User found.')
            }

            res.json(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }

    },

    // Delete to remove friend from list
    async removeFriend(req, res) {
        try {

            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )

            if (!user) {
                return res.status(404).json('No User found.')
            }

            res.json(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }

    },
}