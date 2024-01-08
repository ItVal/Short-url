import express from 'express';
const router = express.Router();

import Url from '../models/url.js';
import { getAllUrls, RedirectOriginUrl } from '../controller/index.js';

router.get('/all', getAllUrls);
router.get('/:code', RedirectOriginUrl);

export default router;
