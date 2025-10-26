const Questionnaire = require('../models/Questionnaire')
const { nanoid } = require('nanoid');

const createQuestionnaire = async (req,res) => {
    try {
        const questionnaire = new Questionnaire({
            title: req.body.title,
            description: req.body.description,
            uniqueID: nanoid(10) // Using nanoid to generate a unique 10 character id.
        })

        await questionnaire.save();
        res.status(201).json(questionnaire);
        
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

module.exports = {
    createQuestionnaire
}