import mongoose from 'mongoose';

const urlScheme = new mongoose.Schema({
	urlCode: String,
	longUrl: String,
	shortUrl: String,
	date: { type: String, default: Date.now },
});

const Url = mongoose.model('Url', urlScheme);
export default Url;
