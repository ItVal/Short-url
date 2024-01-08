import express from 'express';
const router = express.Router();
import validUrl from 'valid-url';
import shortid from 'shortid';
import config from 'config';

import Url from '../models/url.js';

//route Post /api/url/shorten
router.post('/shorten', async (req, res) => {
	const { longUrl } = req.body;
	const baseUrl = config.get('baseUrl');
	//check base url
	if (!validUrl.isUri(baseUrl)) {
		return res.status(401).json('invalid url');
	}

	//create short url
	const urlCode = shortid.generate();

	//check long url
	// if (validUrl.isUri(longUrl)) {
	try {
		let url = await Url.findOne({ longUrl });
		if (url) {
			res.json(url);
		} else {
			const shortUrl = baseUrl + '/' + urlCode;
			url = new Url({
				longUrl,
				shortUrl,
				urlCode,
				date: new Date(),
			});

			await url.save();
			res.json(url);
		}
	} catch (err) {
		console.log(err);
		res.status(500).json('Server error');
	}
	// }
	//  else {
	// 	res.status(401).json('Invalid long url');
	// }
});

export default router;
