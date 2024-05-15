const Responsable = require('../models/Responsable');
const User = require('../models/User');
const bcrypt = require("bcryptjs");

const createResponsable = async (req, res) => {
    try {
        const { nom, email, generated_pwd } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "Email already exists" });
        }

        const responsable = new Responsable({ nom, email, generated_pwd });
        await responsable.save();

        const hashedPassword = await bcrypt.hash(generated_pwd, 10);

        const newUser = new User({
            _id: responsable._id,
            nom,
            email,
            password: hashedPassword,
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

//! ---------------------- test 
const getResponsableByUserId = async (req, res) => {
    try {
        const { id } = req.params;

        const responsable = await Responsable.findOne({ ids_stg: id });

        if (!responsable) {
            return res.status(404).json({ message: 'No Responsable found for this user ID' });
        }

        res.json(responsable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getResponsableById = async (req, res) => {
    try {
        const { id } = req.params;

        const responsable = await Responsable.findOne({_id:id});

        if (!responsable) {
            return res.status(200).json({ message: 'No Responsable found with this ID' });
        }

        res.json(responsable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createResponsable,
    deleteResponsable,
    addIdsStg,
    getResponsableByUserId,
    getResponsableById
};
