const { Schema, Types } = require('mongoose')

const dateFormat = require('../utils/dateFormat')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            // ref: 'reaction',
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            requires: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // converts date to more familiar format
            get: dateFormat
        }
    },
    {
        toJSON: {
            getters: true
        },
        _id: false
    }
)



module.exports = reactionSchema