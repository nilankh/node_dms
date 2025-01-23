const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_USER_PW}@dms.ag99x.mongodb.net/?retryWrites=true&w=majority&appName=dms`)
}

module.exports = connectDB;
