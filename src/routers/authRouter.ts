import { Router } from 'express';

import { authController } from '../controllers';
import { authMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', authMiddleware.registrationDataValidate, authController.registration);
router.post('/login', authMiddleware.loginDataValidate, userMiddleware.checkUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);
router.post('/forgotPassword', userMiddleware.emailBodyValidate, userMiddleware.checkUserExist, authController.sendForgotPassword);
router.patch('/forgotPassword', userMiddleware.passwordValidate, authMiddleware.checkActionToken, authController.changePassword);

export const authRouter = router;
