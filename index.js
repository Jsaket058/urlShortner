const express = require('express');
const urlRoute = require('./routes/url');
const connectDB = require('./config/db');

const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 8001;

connectDB(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });
//Middleware
app.use(express.json());

//Routes
app.use('/api/url', urlRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
