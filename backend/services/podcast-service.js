const commentModel = require('../models/comment-model');
const PodcastModel = require('../models/podcast-model');

class PodcastService {
    async create(data) {
        const { topic, link, ownerId, category } = data;
        const podcast = await PodcastModel.create({
            topic,
            link,
            ownerId,
            category,
        });

        return podcast;
    }

    async getAllPodcasts() {
        const podcasts = await PodcastModel.find().populate('ownerId').exec();
        return podcasts;
    }

    async likePodcast(id, dislike) {
        const podcast = await PodcastModel.findById(id);
        if (dislike) {
            podcast.likes -= 1;
        } else {
            podcast.likes += 1;
        }
        podcast.save();
        return podcast;
    }

    async getPodcast(podcastId) {
        const podcast = await PodcastModel.findOne({ _id: podcastId })
            .populate('comments')
            .populate('ownerId')
            .exec();
        return podcast;
    }

    async addComment(data) {
        const { ownerId, comment, id } = data;
        const newcomment = await commentModel.create({
            ownerId,
            comment,
        });

        const podcast = await PodcastModel.findById(id);
        podcast.comments.push(newcomment._id);
        podcast.save();
        return newcomment;
    }
}

module.exports = new PodcastService();
