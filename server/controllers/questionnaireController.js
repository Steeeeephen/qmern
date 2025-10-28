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

const getQuestionnaires = async (req,res) => {
    try {
        const questionnaires = await Questionnaire.find({});
        res.json(questionnaires);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

const getQuestionnaireByUniqueID = async (req,res) => {
    try {
        const questionnaire = await Questionnaire.findOne({
            uniqueID: req.params.uniqueId
        })

        if (!questionnaire) {
            return res.status(404).json({ error: 'Questionnaire not found' });
        }

        res.json(questionnaire);

    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}







module.exports = {
    createQuestionnaire,
    getQuestionnaires,
    getQuestionnaireByUniqueID,
}