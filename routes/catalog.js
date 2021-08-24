var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');


router.get('/', user_controller.index);
// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/user/create', user_controller.user_create_get);

// POST request for creating Book.
router.post('/user/create', user_controller.user_create_post);

router.get('/leaderBoard', user_controller.user_list);

router.get('/verify', user_controller.user_verify);

router.get('/flappybird', user_controller.flappybird);

module.exports = router;
