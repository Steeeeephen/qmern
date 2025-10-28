const express = require('express');
const router = express.Router();
const Questionnaire = require('../models/Questionnaire');
const Submission = require('../models/Submission')

const questionnaireController = require('../controllers/questionnaireController')

router.get('/test', (req, res) => {
    res.json({message: 'Test route works!'});
});



// Creating a new questionnaire
router.post('/', questionnaireController.createQuestionnaire);

// Get all questionnaires
router.get('/', questionnaireController.getQuestionnaires)

// Get questionnaire by uniqueID - This would be the customer link.
router.get('/link/:uniqueId', questionnaireController.getQuestionnaireByUniqueID)

// Get questionnaire by ID
router.get('/:id', async (req, res) => {
  try {
    const questionnaire = await Questionnaire.findById(req.params.id);
    
    if (!questionnaire) {
      return res.status(404).json({ error: 'Questionnaire not found' });
    }
    
    res.json(questionnaire);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;