const { Schema, model } = require('mongoose')
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
            required: true,
            unique: true,
            validate: [validateEmail]
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please use a valid email']
        }, 
        thoughts: [thoughtSchema], 
        friends: [ this ]
    }, 
    {
        toJSON: {
            getters: true,
        },
    }
)