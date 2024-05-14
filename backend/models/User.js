const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    //todo : add groupe  to let resbonsable filters by groupe
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
    img_url: {
        type: String,
        default: '1.png'
    },
    telephone: {
        type: String,
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