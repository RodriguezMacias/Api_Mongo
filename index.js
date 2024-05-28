import express from 'express';
import { connect } from 'mongoose';
import  connectDB  from './db.js';
import { configDotenv } from 'dotenv';
import  ArticleRoute  from './routes/ArticleRoute.js';

const app = express();

app.use(express.json());

configDotenv();

const PORT = process.env.PORT || 3000;
app.use("/api", ArticleRoute);
connectDB();




app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

