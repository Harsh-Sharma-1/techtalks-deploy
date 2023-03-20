const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discussionSchema = new Schema(
    {
        topic: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        comments: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Comment',
                },
            ],
            default: [],
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Discussion', discussionSchema, 'discussions');
