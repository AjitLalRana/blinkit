import {Router} from 'express';
import {
    createProduct,
} from '../controllers/product.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';


const router = Router();

router.post('/', authMiddleware, upload.array('productImages', 5), createProduct);

export default router;