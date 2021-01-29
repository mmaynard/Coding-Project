const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/amazon-status', controllers.amazonStatus);
router.get('/google-status', controllers.googleStatus);
router.get('/all-status', controllers.allStatus);

module.exports = router;