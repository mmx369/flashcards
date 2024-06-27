import { Router } from 'express';
import { body } from 'express-validator';
import userAuthController from '../controllers/authController';
import dictionaryController from '../controllers/dictionaryController';
import authMiddleware from '../middleware/authMiddleware';

//@ts-ignore
const router = new Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userAuthController.registration
);
router.post('/login', userAuthController.login);
router.post('/logout', userAuthController.logout);

router.get('/activate/:link', userAuthController.activate);
router.get('/refresh', userAuthController.refresh);
router.get('/users', authMiddleware, userAuthController.getUsers);

router.get('/word/:lng', authMiddleware, dictionaryController.getWords);

router.delete(
  '/word/:lng/:id',
  authMiddleware,
  dictionaryController.deleteWord
);

router.post(
  '/newentry',
  authMiddleware,
  body('newWord').trim().notEmpty(),
  body('translation').trim().notEmpty(),
  body('user').trim().isEmail(),
  body('lng').trim().notEmpty(),
  dictionaryController.newEntry
);

export default router;
