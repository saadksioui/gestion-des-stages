const asyncHandler = require('express-async-handler');
const Document = require('../models/Document');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const getAllDocuments = asyncHandler(async (req, res) => {
  try {
    const documents = await Document.find().populate('user_id');
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/docs');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});
  
  // Initialize multer
  const upload = multer({ storage: storage }).single('file');

const createDocument = asyncHandler(async (req, res) => {
  try {
    const { user_id, type, version } = req.body;

    
    const file = req.file.originalname; 

    const document = new Document({
      user_id,
      type,
      version,
      file, 
    });

   
    await document.save();

    
    res.status(201).json({ success: true, message: 'Document added successfully', document });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


const updateDocument = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Document.updateOne({ _id: id }, req.body);
    res.json({ message: 'Document updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const deleteDocument = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findOne({ _id: id });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const filePath = path.join(__dirname, '../frontend/public/docs', document.file);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    fs.unlinkSync(filePath);

    await Document.deleteOne({ _id: id });

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const getDocumentById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id).populate('user_id');
    if (document) {
      res.json(document);
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const searchDocuments = asyncHandler(async (req, res) => {
  try {
    const { type, version } = req.body;
    let query = {};

    if (type) {
      query.type = { $regex: type, $options: 'i' };
    }
    if (version) {
      query.version = { $regex: version, $options: 'i' };
    }

    const documents = await Document.find(query).populate('user_id');
    if (documents.length === 0) {
      return res.status(404).json({ message: "No documents found for the specified criteria." });
    }

    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const getDocumentsByUserId = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const documents = await Document.find({ user_id: userId }).populate('user_id');
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




module.exports = {
  getAllDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  getDocumentById,
  searchDocuments,
  getDocumentsByUserId,
  upload
};
