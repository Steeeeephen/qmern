// import express from 'express';
const express = require('express');
const { connectToDB } = require('./config/db')

const questionnaireRoutes  = require('./routes/questionnaires')
const submissionRoutes = require('./routes/submission')

const app = express();
const PORT = 3000;

connectToDB();


app.use(express.json());

app.use('/api/questionnaires', questionnaireRoutes );
app.use('/api/submissions', submissionRoutes);





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
