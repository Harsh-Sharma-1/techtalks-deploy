class UserDto {
    id;
    phone;
    name;
    avatar;
    activated;
    createdAt;
    preferences;
    liked;

    constructor(user) {
        this.id = user._id;
        this.phone = user.phone;
        this.name = user.name;
        this.avatar = user.avatar;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
        this.preferences = user.preferences;
        this.liked = user.liked;
    }
}

module.exports = UserDto;
