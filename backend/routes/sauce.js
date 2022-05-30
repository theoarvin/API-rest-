const express = require('express');
const router = express.Router()
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/', auth, sauceCtrl.getAllSauces)
//router.get('/:id', auth, sauceCtrl.getOneSauce)
//router.post('/', auth,multer, sauceCtrl.createSauce)
//router.put('/:id', auth, sauceCtrl)
//router.delete('/:id', auth, sauceCtrl)
//router.post('/:id/like', auth, sauceCtrl)

module.exports = router;