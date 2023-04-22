const { ObjectID } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models')

module.exports = {
// Get all thoughts
async getThoughts(req, res) {
    try {
        const thoughts = await Thought.find()


        res.json(thoughts)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
},

// Get a single thought
async getSingleThought(req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')

            if (!thought) {
                return res.status(404).json('No thought with this id found.')
            }

        res.json(thought)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
},

// Post a new thought
async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body)

        const something = await User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: {thoughts: thought._id }},
            { runValidators: true, new: true}
        )

        res.json(thought)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
},

// Put to update a thought
async updateThought(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body },
            { runValidators: true, new: true}
            )

            if (!thought) {
                return res.status(404).json('No thought with this id found.')
            }

        res.json(thought)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
},

// Delete to remove a thought
async removeThought(req, res) {
    try {
        const thought = await Thought.findOneAndRemove(
            { _id: req.params.thoughtId }
        )

        if (!thought) {
            return res.status(404).json('No thought with this id found.')
        }

        res.json('Thought has been successfully deleted.')
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
},

//  thoughts/:thoughtId/reactions
// Post to create reaction stored in thought's array
async addReaction(req, res) {
    try { 
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
            )
            console.log(req.params.thoughtId);

        if (!thought) {
            return res.status(404).json('No thought with this id found.')
        }

        res.json(thought)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
},

// Delete to remove reaction by reactionId
async deleteReaction(req, res) {
    try { 
        console.log(req.params.thoughtId);
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $pull: { reactions: { reactionId: req.params.reactionId } }},
            { runValidators: true, new: true }
        )

        if (!thought) {
            return res.status(404).json('No thought with this id found.')
        }

        res.json(thought)
    } catch (err) {
        console.log(err);
        return res.status(500).json('Unknown error')
    }
},
}