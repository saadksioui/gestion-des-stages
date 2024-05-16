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
router.get('/search/stage', candidatureController.getCandidaturesByStage);

// GET candidature by Stagiaire Id
router.get('/demandes/:id_stagiaire', candidatureController.getCandidaturesByStagiaire);

module.exports = router;
