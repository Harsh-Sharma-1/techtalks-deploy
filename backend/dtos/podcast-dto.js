class PodcastDto {
    id;
    topic;
    category;
    link;
    ownerId;
    createdAt;
    likes;

    constructor(podcast) {
        this.id = podcast._id;
        this.topic = podcast.topic;
        this.category = podcast.category;
        this.link = podcast.link;
        this.likes = podcast.likes;
        this.ownerId = podcast.ownerId;
        this.createdAt = podcast.createdAt;
    }
}

module.exports = PodcastDto;
