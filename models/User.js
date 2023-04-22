const { Schema, model, mongoose } = require('mongoose');
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
            type: String,
            trim: true,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Enter valid email address."]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }]
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
    .get(function () {
        return this.friends.length
    })

const User = model('User', userSchema)

module.exports = User;