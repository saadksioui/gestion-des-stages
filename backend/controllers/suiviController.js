const asyncHandler = require('express-async-handler')
const Suivi = require('../models/Suivi');

const getSuiviById = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const suivi = await Suivi.findOne({_id:id});
      if (!suivi) {
        return res.status(404).json({ message: "Suivi not found" });
      }
      res.json(suivi);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  //todo : fix 
  // get all suvi for one Responsable
  const getSuiviByIdResponsable = asyncHandler(async (req, res) => {
    try {
      const { id_responsabl } = req.params;
  
      const suivis = await Suivi.find({ id_responsable:id_responsabl });
  
      if (!suivis || suivis.length === 0) {
        return res.status(404).json({ message: "No suivis found for this responsable" });
      }
  
      res.json(suivis);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
const createSuivi = asyncHandler(async (req, res) => {
  try {
    const suivi = new Suivi(req.body);
    await suivi.save();
    res.status(201).json(suivi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const sendMessage = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { id_utilisateur, message } = req.body;
  
      const newMessage = {
        id_utilisateur,
        message,
        created_at: Date.now() 
      };
  
      const updatedSuivi = await Suivi.updateOne(
        { _id: id }, 
        { $push: { chat: newMessage } } 
      );
  
      res.json(updatedSuivi);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

const deleteSuivi = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Suivi.findByIdAndDelete(id);
    res.json({ message: 'Suivi deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteChat = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
  
      const updatedSuivi = await Suivi.updateOne(
        { _id: id }, 
        { $unset: { chat: "" } } 
      );
  
      res.json({message:'supprimé avec succès'},updatedSuivi);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

  const deleteChatMessage = asyncHandler(async (req, res) => {
    try {
      const { id } = req.body;
      const { message_id } = req.params;
  
      const updateQuery = {
        $pull: { chat: { _id: message_id } }
      };
  
      const updatedSuivi = await Suivi.updateOne(
        { _id:id },
        updateQuery
      );
  
      if (updatedSuivi.nModified === 0) {
        return res.status(404).json({ message: 'Chat message not found' });
      }
  
      res.json({ message: 'Chat message deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

module.exports = {
    getSuiviById,
    createSuivi,
    sendMessage,
    deleteSuivi,
    deleteChat,
    getSuiviByIdResponsable,
    deleteChatMessage

  }