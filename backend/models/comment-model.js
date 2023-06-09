const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    comment: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Comment', commentSchema, 'comments');
