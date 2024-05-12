
const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    domaine: {
        type: String,
        required: true
    },
    localisation: {
        type: String,
        required: true
    },
    competences_requises: {
        type: [String],
        default: []
    },
    date_debut: {
        type: Date,
        required: true
    },
    duree: {
        type: Number,
        required: true
    },
    entreprise: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true }
    ,
    statut: {
        type: String,
        enum: ['ouvert', 'fermé', 'en cours', 'terminé'],
        default: 'ouvert'
},
});

const Stage = mongoose.model('Stage', stageSchema);

module.exports = Stage;
