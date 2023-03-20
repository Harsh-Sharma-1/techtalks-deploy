const UserModel = require('../models/user-model');
class UserService {
    async findUser(filter) {
        const user = await UserModel.findOne(filter)
            .populate('liked')
            .populate('liked/ownerId')
            .exec();
        return user;
    }

    async createUser(data) {
        const user = await UserModel.create(data);
        return user;
    }

    async addLike(userId, podcastId) {
        const user = await UserModel.findById(userId);
        if (user.liked.includes(podcastId)) {
            user.liked = user.liked.filter((like) => {
                return like != podcastId;
            });

            user.save();
            return false;
        }
        user.liked.push(podcastId);
        user.save();
        return true;
    }
}

module.exports = new UserService();
