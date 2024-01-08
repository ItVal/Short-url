import express from 'express';
const router = express.Router();

import Url from '../models/url.js';
import {
	getAllUrls,
	RedirectOriginUrl,
	handleShortUrl,
} from '../controller/index.js';

router.get('/all', getAllUrls);
router.get('/:code', RedirectOriginUrl);
router.post('/url/shorten', handleShortUrl);

export default router;
