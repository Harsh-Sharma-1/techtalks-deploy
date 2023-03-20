const CommentModel = require('../models/comment-model');
const DiscussionModel = require('../models/discussion-model');

class DiscussionService {
    async create(data) {
        const { topic, description, ownerId } = data;
        const discussion = await DiscussionModel.create({
            topic,
            description,
            ownerId,
        });
        return discussion;
    }

    async getAllDiscussions() {
        const discussions = await DiscussionModel.find()
            .populate('ownerId')
            .populate('comments')
            .exec();
        return discussions;
    }

    async addComment(data) {
        const { ownerId, comment, id } = data;

        const newcomment = await CommentModel.create({
            ownerId,
            comment,
        });

        const discussion = await DiscussionModel.findById(id);
        discussion.comments.push(newcomment._id);
        discussion.save();
        return newcomment;
    }

    async getDiscussion(discussionId) {
        const discussion = await DiscussionModel.findOne({ _id: discussionId })
            .populate('comments')
            .populate('ownerId')
            .exec();
        return discussion;
    }
}

module.exports = new DiscussionService();
