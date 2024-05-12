// const moment = require('moment');
const mongoose = require('mongoose');

const suiviSchema = new mongoose.Schema({
    id_responsable: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    id_étudiant: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    date_suivi: {
        type: Date,
        default: Date.now
    },
    chat: [
        {
            id_utilisateur: {
                type: mongoose.Schema.Types.ObjectId, ref: 'User',
                required: true
            },
            created_at: {
                type: Date,
                default: Date.now(),
            },
            message: {
                type: String,
                default: ''
            }
        }
    ]
  
});

const Suivi = mongoose.model('Suivi', suiviSchema);

module.exports = Suivi;
