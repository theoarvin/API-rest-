const express = require('express');

// la fonction Router()
const router = express.Router()

// importation du controllers/user
const userCtrl = require('../controllers/user');

const apiLimiter = require('../middleware/rate-limit');
const controleEmail = require('../middleware/controleEmail');
const password = require('../middleware/password');
// la route (endpoint) signup
router.post('/signup',controleEmail,password, userCtrl.signup);
// la route (endpoint) login
router.post('/login',apiLimiter, userCtrl.login);

module.exports = router;