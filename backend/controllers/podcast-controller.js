const PodcastDto = require('../dtos/podcast-dto');
const podcastService = require('../services/podcast-service');
const userService = require('../services/user-service');

class PodcastController {
    async create(req, res) {
        const { topic, link, category } = req.body;
        if (!topic || !link) {
            return res.status(400).json({
                message: 'All fields are required!',
            });
        }

        const podcast = await podcastService.create({
            topic,
            link,
            ownerId: req.user._id,
            category,
        });

        return res.json(new PodcastDto(podcast));
    }

    async index(req, res) {
        const podcasts = await podcastService.getAllPodcasts();
        const allPodcasts = podcasts.map((podcast) => new PodcastDto(podcast));
        return res.json(allPodcasts);
    }

    async addComment(req, res) {
        const { id } = req.params;
        const { comment } = req.body;
        const userId = req.user._id;

        const newcomment = await podcastService.addComment({
            comment,
            id,
            ownerId: userId,
        });

        res.json(newcomment);
    }

    async show(req, res) {
        const podcast = await podcastService.getPodcast(req.params.podcastId);
        return res.json(podcast);
    }

    async likePodcast(req, res) {
        const userId = req.user._id;
        const userLike = await userService.addLike(userId, req.params.id);
        if (userLike) {
            const podcast = await podcastService.likePodcast(
                req.params.id,
                false
            );
            res.json(podcast);
        } else {
            const podcast = await podcastService.likePodcast(
                req.params.id,
                true
            );
            res.status(200).json({
                message: 'already liked',
                podcast,
            });
        }
    }
}

module.exports = new PodcastController();
