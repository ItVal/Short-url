import Url from '../models/url.js';

export const getUrls = async (req, res, next) => {
	const bodyrequest = req.body;
	try {
		const allurls = await Url.findAll();
		if (!allurls) {
			res.status(200).json('no url found');
			return next;
		}
		res.status(200).json('Urls fetched successfully');
	} catch (error) {}
};
