import express from 'express';
import connectDB from './config/db.js';
import postURL from './routes/url.js';
import getURL from './routes/index.js';

const app = express();

//connect to database
connectDB();

app.use(express.json({ extended: false }));

//routes define
app.use('/api/url', postURL);
app.use('/api', getURL);

const PORT = 2025;

app.listen(PORT, () => console.log('server running on port:', PORT));
