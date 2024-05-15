const express = require('express');
const router = express.Router();
const suiviController = require('../controllers/suiviController');

// GET  suivis
router.get('/show/:id', suiviController.getSuiviById);

// GET all suivis for one Responsable
router.get('/get_responsable', suiviController.getSuivisByIdResponsable);
router.get('/getSuiviByIdResponsable_etud', suiviController.getSuiviByIdResponsable_etud);
router.get('/get_etud', suiviController.getSuiviByIdEtud);

// Create a new suivi
router.post('/add', suiviController.createSuivi);

// Update a suivi
router.post('/send/:id', suiviController.sendMessage);

// Delete a suivi
router.delete('/delete/:id', suiviController.deleteSuivi);

// Delete chat
router.put('/deletechat/:id', suiviController.deleteChat);

router.put('/deleteChatMessage/:message_id', suiviController.deleteChatMessage);

module.exports = router;
