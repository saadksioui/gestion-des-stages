const asyncHandler = require('express-async-handler')
const Suivi = require('../models/Suivi');
const io = require('../server');
const getSuiviById = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const suivi = await Suivi.findOne({_id:id});
      if (!suivi) {
        return res.status(200).json({ message: "Suivi not found" });
      }
      res.json(suivi);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  const getSuivisByIdResponsable = asyncHandler(async (req, res) => {
    try {
      const { id_responsable } = req.body;

      const suivis = await Suivi.find({ id_responsable:id_responsable});

      res.json(suivis);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  const getSuiviByIdEtud = asyncHandler(async (req, res) => {
    try {
      const { id_étudiant } = req.query;

      // Assuming `Suivi` is your Mongoose model for the collection
      const suivi = await Suivi.findOne({ id_étudiant });

      // if (!suivi) {
      //   return res.status(404).json({ message: 'Suivi not found for this student ID' });
      // }

      res.status(201).json(suivi);
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
    const { id } = req.params; // This is the chat ID
    const { id_utilisateur, message } = req.body;

    const newMessage = {
      id_utilisateur,
      message,
      created_at: Date.now(),
    };

    const updatedSuivi = await Suivi.findByIdAndUpdate(
      id,
      { $push: { chat: newMessage } },
      { new: true } // Return the updated document
    );

    if (!updatedSuivi) {
      return res.status(404).json({ message: 'Suivi not found' });
    }

    const io = req.app.get('socketio');
    io.emit('newMessage', { chatId: id, message: newMessage });

    res.json(newMessage);
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

      res.json({ message: 'Chat message deleted successfully 1' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  const getSuiviByIdResponsable_etud = asyncHandler(async (req, res) => {
    try {
      const { id_responsable ,id_étudiant } = req.query;

      const suivis = await Suivi.findOne({ id_responsable:id_responsable, id_étudiant:id_étudiant });

      res.json(suivis);
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
    getSuivisByIdResponsable,
    deleteChatMessage,
    getSuiviByIdEtud,
    getSuiviByIdResponsable_etud
  }