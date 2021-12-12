const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reacationBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
           type: Date,
           defaullt: Date.now,
           get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {    
        toJSON: {
            getters: true
        }   
    }
)


module.exports = ReactionSchema;