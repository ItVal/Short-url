import express from 'express';
const router = express.Router();

import Url from '../models/url.js';
import { getAllUrls } from '../controller/index.js';

router.get('/all', getAllUrls);
//route Get /:code
// desc Redirect to long/original Url
router.get('/:code', async (req, res) => {
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
});

export default router;
