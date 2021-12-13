const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../')

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [thoughtSchema],
        friends: [this]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

const User = model('User', UserSchema);

module.exports = User;