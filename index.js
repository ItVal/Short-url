import express from 'express';
import connectDB from './config/db.js';

const app = express();

//connect to database
connectDB();
app.use(express.json({ extended: false }));

const PORT = 2025;

app.listen(PORT, () => console.log('server running on port:', PORT));
