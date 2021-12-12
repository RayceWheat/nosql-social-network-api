const { Schema, model, Types } = require('mongoose');
const { reactionSchema } = require('./Reaction.js');

const ThoughtSchema = new Schema( 
    {
        thoughtText: {
            type: String,
            required: true,

        },
        createdAt: {

        },
        username: {

        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactions').get(function(){
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought