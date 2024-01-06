import express from 'express';

const app = express();

app.use(express.json({ extended: false }));

const PORT = 2025;

app.listen(PORT, () => console.log('server running on port:', PORT));
