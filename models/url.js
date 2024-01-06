import mongoose from 'mongoose';

const urlScheme = new mongoose.Scheme({
	urlCode: String,
	longUrl: String,
	shortUrl: String,
	date: { type: String, default: Date.now },
});

export default mongoose.model('Url', urlScheme);
