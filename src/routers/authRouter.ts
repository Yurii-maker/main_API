import { Router } from 'express';

import { authController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { userMiddleware } from '../middlewares/userMiddleware';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login', userMiddleware.checkUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

export const authRouter = router;
