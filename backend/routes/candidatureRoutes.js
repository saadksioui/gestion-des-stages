const express = require('express');
const router = express.Router();
const candidatureController = require('../controllers/candidatureController');

// GET all candidatures
router.get('/', candidatureController.getAllCandidatures);

// Create a new candidature
router.post('/add', candidatureController.createCandidature);

// Update a candidature
router.put('/edit/:id', candidatureController.updateCandidature);

// Delete a candidature
router.delete('/delete/:id', candidatureController.deleteCandidature);

// GET candidature by Id
router.get('/search', candidatureController.getCandidaturesById);

// GET candidature by Stage Id
router.get('/search/stage/:id', candidatureController.getCandidaturesByStage);

// GET candidature by Stagiaire Id
router.get('/demandes/:id_stagiaire', candidatureController.getCandidaturesByStagiaire);

// Accepter une demande
router.put('/accept/:id', candidatureController.accepterDemande);

// Refuser une demande
router.put('/refuse/:id', candidatureController.refuserDemande);

module.exports = router;
