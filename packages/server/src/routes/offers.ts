import express from 'express';
import { catchAsync } from '../middlewares/errors';
import {
  getOffers,
  getSearchedOffers,
  getSingleOffer,
  createOffer,
  deleteOffer,
  editOffer,
  getUserOffer,
  getUserOffers,
} from '../controllers/offersController';
import { validateToken } from '../middlewares/validateToken';
import { validateUser } from '../middlewares/validateUser';
import { validateFilters } from '../middlewares/validateFilters';

const router = express.Router();

router.get('/', validateFilters, catchAsync(getOffers));
router.get('/page/:page', validateFilters, catchAsync(getOffers));
router.get('/search', validateFilters, catchAsync(getSearchedOffers));
router.get('/:id', catchAsync(getSingleOffer));
router.post('/new', validateToken, validateUser, catchAsync(createOffer));
router.delete('/:id', validateToken, validateUser, catchAsync(deleteOffer));
router.put('/:id', validateToken, validateUser, catchAsync(editOffer));
router.get('/myoffers/:id', validateToken, validateUser, catchAsync(getUserOffer));
router.get('/myoffers', validateToken, validateUser, catchAsync(getUserOffers));

export default router;
