import { Router } from 'express';
import {
    registerUser,
    verifyEmail,
    loginUser,
    logoutUser,
    uploadAvatar,
    updateUserDetails,
    forgotPassword,
    resetPassword
} from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';

const router = Router();


router.post('/register', registerUser);
router.get('/verify-email', verifyEmail);
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.post('/avatar', authMiddleware, upload.single('avatar'),uploadAvatar);
router.put('/update-user', authMiddleware, updateUserDetails);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


export default router;