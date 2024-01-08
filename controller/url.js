import Url from '../models/url.js';

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

export const getRedirectUrl = async (req, res) => {
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
