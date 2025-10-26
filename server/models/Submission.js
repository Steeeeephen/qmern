const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    questionnaireId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questionnaire', // Referencing the Questionnaire model.
        required: true
    },
    customerEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    answers: {
        type: Object,
        required: true
    },
    submittedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Method to lock the submission
submissionSchema.methods.lock = function() {
  this.isLocked = true;
  this.submittedAt = new Date();
  return this.save();
};

module.exports = mongoose.model('Submission', submissionSchema);