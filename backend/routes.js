const router = require('express').Router();
const activateController = require('./controllers/activate-controller');
const authController = require('./controllers/auth-controller');
const roomsController = require('./controllers/rooms-controller');
const authMiddleware = require('./middlewares/auth-middleware');
const podcastController = require('./controllers/podcast-controller');
const discussionController = require('./controllers/discussion-controller');

// authentication routes
router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp', authController.verifyOtp);
router.get('/api/refresh', authController.refresh);
router.post('/api/activate', authMiddleware, activateController.activate);
router.post('/api/logout', authMiddleware, authController.logout);

// rooms routes
router.post('/api/rooms', authMiddleware, roomsController.create);
router.get('/api/rooms', authMiddleware, roomsController.index);
router.get('/api/rooms/:roomId', authMiddleware, roomsController.show);

// podcast routes
router.post('/api/podcasts', authMiddleware, podcastController.create);
router.get('/api/podcasts', authMiddleware, podcastController.index);
router.get('/api/podcasts/:podcastId', authMiddleware, podcastController.show);
router.post(
    '/api/podcasts/:id/comment',
    authMiddleware,
    podcastController.addComment
);
router.get(
    '/api/podcasts/:id/likepodcast',
    authMiddleware,
    podcastController.likePodcast
);

// discussion routes
router.post('/api/discussions', authMiddleware, discussionController.create);
router.get('/api/discussions', authMiddleware, discussionController.index);
router.get(
    '/api/discussions/:discussionId',
    authMiddleware,
    discussionController.show
);
router.post(
    '/api/discussions/:id/comment',
    authMiddleware,
    discussionController.addComment
);

router.get('/api/test', (req, res) => res.json({ msg: 'OK' }));

module.exports = router;
