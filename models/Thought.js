const { Schema, model } = require('mongoose')
const reactionSchema = require('./Reaction')

const dateFormat = require('../utils/dateFormat')



const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // converts date format to more readable format.
            get: dateFormat
        },
        username:
        {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false
    }
)

// creates a count of the number of reactions.
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length
    })

const Thought = model('Thought', thoughtSchema)

module.exports = Thought
