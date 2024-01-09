import Url from '../models/url.js';
import 'dotenv/config.js';

import validUrl from 'valid-url';
import shortid from 'shortid';
// import config from 'config';

export const handleShortUrl = async (req, res, next) => {
	const { longUrl } = req.body;

	const baseUrl = process.env.baseUrl;
	//check base url
	if (!validUrl.isUri(baseUrl)) {
		return res.status(401).json('invalid url');
	}
	//create short url
	const urlCode = shortid.generate();
	let url;
	//check if shortId already exists
	do {
		url = await Url.findOne({ shortId: urlCode });
		if (url) {
			urlCode = shortid.generate();
		}
	} while (url);

	//check long url
	if (!validUrl.isUri(longUrl)) {
		return res.status(401).json('Invalid long url');
	}
	try {
		url = await Url.findOne({ shortId: urlCode });
		if (url) {
			res.json(url);
		} else {
			const shortUrl = baseUrl + '/' + urlCode;
			let url = new Url({
				shortId: urlCode,
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
};

export const getAllUrls = async (req, res, next) => {
	try {
		const allurls = await Url.find();
		if (!allurls) {
			res.status(200).json('no url found');
		}

		return res.status(200).json({
			message: 'Urls fetched successfully',
			data: allurls,
		});
	} catch (error) {
		console.error(error);
	}
};

export const RedirectOriginUrl = async (req, res) => {
	try {
		const url = await Url.findOne({ urlCode: req.params.code });

		if (url) {
			return res.redirect(url.longUrl);
		} else {
			return res.status(404).json('no url found');
		}
	} catch (err) {
		console.error(err);
		res.status(500).json('Internal Server Error');
	}
};
