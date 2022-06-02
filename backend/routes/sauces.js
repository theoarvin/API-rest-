const express = require('express');
const router = express.Router()
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth,multer, sauceCtrl.postSauce)
router.get('/', auth,multer, sauceCtrl.getAllSauces)
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.put('/:id', auth,multer, sauceCtrl.changeSauce)
router.delete('/:id', auth,multer, sauceCtrl.deleteSauce)
//router.post('/:id/like', auth, sauceCtrl)

module.exports = router; 