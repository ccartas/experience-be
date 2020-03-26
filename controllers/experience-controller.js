const { Experience } = require('./../models/models');

const addExperience = async (req, res, next) => {
    const experience = req.body;
    try { 
        await Experience.create({...experience, username: req.user.username});
        res.status(201).send({
            message: 'Experience created successfully.'
        })
    } catch(err) {
        res.status(500).send({
            message: 'There was a problem when creating the experience'
        })
    }
}

const getAllExperiences = async (req, res, next) => {
    try {
        const experiences = await Experience.find();
        res.status(200).send(experiences);
    } catch(err) {
        res.status(500).send({
            message: 'There was a problem when requesting the experiences'
        })
    }
}

module.exports = {
    addExperience,
    getAllExperiences
}