const { Schema } = require('mongoose')

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
            
        }
    }
)



module.exports = reactionSchema