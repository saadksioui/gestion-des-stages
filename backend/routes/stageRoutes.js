const express = require('express');
const router = express.Router();
const stageController = require('../controllers/stageController');

// GET all stages
router.get('/', stageController.getAllStages);

// GET all stages by entreprise
router.get('/entreprise/:entrepriseId', stageController.getStagesByEntrepriseId);
// Create a new stage
router.post('/add', stageController.createStage);

// Update a stage
router.put('/edit/:id', stageController.updateStage);

// Delete a stage
router.delete('/delete/:id', stageController.deleteStage);

// search a stage by titre or domain
router.get('/search', stageController.searchStages);

module.exports = router;
