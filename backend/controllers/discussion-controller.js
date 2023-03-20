const DiscussionDto = require('../dtos/discussion-dto');
const discussionService = require('../services/discussion-service');

class DiscussionController {
    async create(req, res) {
        const { topic, description } = req.body;
        if (!topic || !description) {
            return res.status(400).json({
                message: 'All fields are required',
            });
        }

        const userId = req.user._id;

        const discussion = await discussionService.create({
            topic,
            description,
            ownerId: userId,
        });

        res.json(new DiscussionDto(discussion));
    }

    async index(req, res) {
        const discussions = await discussionService.getAllDiscussions();
        const allDiscussions = discussions.map(
            (discussion) => new DiscussionDto(discussion)
        );
        res.json(allDiscussions);
    }

    async addComment(req, res) {
        const { id } = req.params;
        const { comment } = req.body;
        const userId = req.user._id;

        const newcomment = await discussionService.addComment({
            comment,
            id,
            ownerId: userId,
        });

        res.json(newcomment);
    }

    async show(req, res) {
        const discussion = await discussionService.getDiscussion(
            req.params.discussionId
        );
        return res.json(discussion);
    }
}

module.exports = new DiscussionController();
