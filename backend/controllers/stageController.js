const Stage = require('../models/Stage');

const asyncHandler = require('express-async-handler')

const getAllStages = asyncHandler(async (req, res) => {
  try {
    const stages = await Stage.find();
    res.json(stages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//! -------------for test ------------------------
// const getAllStages = asyncHandler(async (req, res) => {
//     try {
//       const stages = await Stage.findOne();
//       const entreprise = await User.findOne({ _id: stages.entreprise });
  
//       res.json({ stages, entreprise });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
//!-----------------------------------------
const createStage = asyncHandler(async (req, res) => {
  try {
    const stage = new Stage(req.body);
    await stage.save();
    res.status(201).json(stage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateStage = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      await Stage.updateOne({ _id: id }, req.body);
      res.json({message:'Mise à jour du stage réussie'});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

const deleteStage = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Stage.deleteOne({_id:id});
    res.json({ message: 'Stage supprimé avec succès' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//todo :search by domaine and titre 

const searchStages = asyncHandler(async (req, res) => {
    try {
      const { titre, domaine } = req.body;
      let query = {};
  
      //  The i option makes the regex case-insensitive, so the search is not affected by the case of the letters.
      if (titre) {
        query.titre = { $regex: titre, $options: 'i' }; 
      }
      if (domaine) {
        query.domaine = { $regex: domaine, $options: 'i' }; 
      }
  
      const stages = await Stage.find(query);
      if (stages.length === 0) {
        return res.status(404).json({ message: "Aucun résultat trouvé pour les critères de recherche spécifiés." });
      }
  
      res.json(stages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
module.exports = {
  getAllStages,
  createStage,
  updateStage,
  deleteStage,
  searchStages
};

