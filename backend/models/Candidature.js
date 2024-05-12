
const mongoose = require('mongoose');

const candidatureSchema = new mongoose.Schema({
  id_utilisateur: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'User', 
    required: true 

  },
  id_stage: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'Stage', 
    required: true 

  },
  date_candidature: { 
    type: Date, 
    default: Date.now 

  },
  statut_candidature: { 
    type: String, enum: ['en attente', 'acceptée', 'refusée'], 
    default: 'en attente' 
}
});

const Candidature = mongoose.model('Candidature', candidatureSchema);

module.exports = Candidature;

