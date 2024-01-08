import Url from '../models/url.js';

import validUrl from 'valid-url';
import shortid from 'shortid';
import config from 'config';

export const handleShortUrl = async (req, res, next) => {
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
		let url = await Url.findOne({});
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
};

export const getAllUrls = async (req, res, next) => {
	try {
		const allurls = await Url.find();
		if (!allurls) {
			res.status(200).json('no url found');
		}
		// res.json(allurls);
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
