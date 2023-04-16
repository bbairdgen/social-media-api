const { Schema, model }= require('mongoose')

const reactionSchema = new Schema(
    {
        reactionID: [{ 
            type: Schema.Types.ObjectId,
            ref: 'reaction',
            default: null
        }],
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
            // TODO: query to format date
        }
    }
)

const Reaction = model('reaction', reactionSchema)

module.exports = Reaction