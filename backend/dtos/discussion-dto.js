class DiscussionDto {
    id;
    topic;
    description;
    ownerId;
    comments;

    constructor(data) {
        this.id = data._id;
        this.topic = data.topic;
        this.description = data.description;
        this.ownerId = data.ownerId;
        this.comments = data.comments;
    }
}

module.exports = DiscussionDto;
