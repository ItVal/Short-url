import express from 'express';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import Urls from './routes/url.js';

const app = express();

//connect to database
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes define
// app.use('/api/url', postURL);
app.use('/api', Urls);

const PORT = 2025;

app.listen(PORT, () => console.log('server running on port:', PORT));
