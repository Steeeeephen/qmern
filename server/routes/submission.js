const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');

// Create a new submission
router.post('/', async (req, res) => {
  try {
    const submission = new Submission({
      questionnaireId: req.body.questionnaireId,
      customerEmail: req.body.customerEmail,
      answers: req.body.answers
    });
    
    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all submissions
router.get('/', async (req, res) => {
  try {
    const submissions = await Submission.find({})
      .populate('questionnaireId');  // This "populates" the questionnaire data
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get submissions for a specific questionnaire
router.get('/questionnaire/:questionnaireId', async (req, res) => {
  try {
    const submissions = await Submission.find({ 
      questionnaireId: req.params.questionnaireId 
    });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single submission
router.get('/:id', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('questionnaireId');
    
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lock a submission
router.patch('/:id/lock', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    
    await submission.lock();  // Uses the method we defined in the model
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;