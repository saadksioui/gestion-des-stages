const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    nom: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    type_utilisateur: {
        type:String,
        default:'étudiant'
    },
    infos_specifiques: {
        type:String
    },
    img_url: {
        type:String,
        default: null
    },
    cv_url: {
        type:String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = User = mongoose.model("User", UserSchema);