const Responsable = require('../models/Responsable');
const User = require('../models/User');

const createResponsable = async (req, res) => {
    try {
        const { nom, email, generated_pwd } = req.body;

        const responsable = new Responsable({ nom, email, generated_pwd });

        await responsable.save();

        const newUser = new User({
            _id:responsable._id,
            nom,
            email,
            password:generated_pwd,
            type_utilisateur: 'responsable pédagogique'
        });

        await newUser.save();
        res.status(201).json(responsable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteResponsable = async (req, res) => {
    try {
        const { id } = req.params;

        const responsable = await Responsable.findOne({_id:id});
        if (!responsable) {
            return res.status(200).json({ message: 'Responsable not found' });
        }

        const userId = responsable._id;

        await Responsable.deleteOne({_id:userId});

        await User.deleteOne({_id:userId});

        res.status(200).json({ message: 'Responsable deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const addIdsStg = async (req, res) => {
    try {
        const { id } = req.params;
        const { ids_stg } = req.body;

        const updatedResponsable = await Responsable.updateOne({_id:id}, 
            { $push: { ids_stg:ids_stg } });

        res.json(updatedResponsable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports = {
    createResponsable,
    deleteResponsable,
    addIdsStg
};
