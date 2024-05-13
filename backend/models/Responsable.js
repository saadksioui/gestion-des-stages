const mongoose = require('mongoose');

const responsableSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    generated_pwd: {
        type: String,
        required: true
    },
    ids_stg: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
});

const Responsable = mongoose.model('Responsable', responsableSchema);

module.exports = Responsable;
