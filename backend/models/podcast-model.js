const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const podcastSchema = new Schema(
    {
        topic: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            default: 'Science talks',
        },
        ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
        link: {
            type: String,
            required: true,
        },
        likes: {
            type: Number,
            default: 0,
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
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Podcast', podcastSchema, 'podcasts');
