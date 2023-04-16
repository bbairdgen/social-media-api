const { Schema, model, mongoose } = require('mongoose');
require('mongoose-type-email');
const thoughtSchema = require('./Thought')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        }, 
        email: { 
            type: mongoose.SchemaTypes.Email,
            required: true,
            unique: true,
        }, 
        thoughts: [thoughtSchema], 
        friends: [ this ]
    }, 
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
)

userSchema
.virtual('friendCount')
.get(function() {
    // TODO: check to make sure this is right.
    return this.friends.length
})

const User = model('user', userSchema)

module.exports = User;