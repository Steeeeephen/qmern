const mongoose = require('mongoose');

const uri = 'mongodb+srv://stephenzalalas_db_user:LRsB2DnbVQz8tHpc@cluster0.t8exszn.mongodb.net/qmern?retryWrites=true&w=majority&appName=Cluster0';

async function connectToDB() {
    try {
        await mongoose.connect(uri);
        console.log(`Now connected to MongoDB`);
    } catch (error) {
        console.error(`MongoDB connection error:`, err);
        throw err;
    }
}

module.exports = {
  connectToDB
};