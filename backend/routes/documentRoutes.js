const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// GET all documents
router.get('/', documentController.getAllDocuments);

// Create a new document
router.post('/add',documentController.upload, documentController.createDocument);

// Update a document
router.put('/edit/:id', documentController.updateDocument);

// Delete a document
router.delete('/delete/:id', documentController.deleteDocument);

// GET document by Id
router.get('/search/:id', documentController.getDocumentById);

// Search documents
router.post('/search', documentController.searchDocuments);

// GET documents by User Id
router.get('/user/:userId', documentController.getDocumentsByUserId);


module.exports = router;
