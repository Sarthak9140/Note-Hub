const express = require('express');
const { createCard , getCard , getSingleCard, updateCard , deleteCard} = require('../controllers/card.controller.js'); // ✅ FIXED import
const upload = require('../middleware/upload.js');
const router = express.Router();

router.post('/createCard', upload.single('image'), createCard); 
router.get('/getCard' ,getCard )
router.get('/getSingleCard/:id', getSingleCard);
router.put('/updateCard/:id', updateCard);
router.delete('/deleteCard/:id', deleteCard);

module.exports = router;
