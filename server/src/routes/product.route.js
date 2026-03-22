import { Router } from 'express';
import {
    createProduct,
    getAllProducts,
    getProductDetails,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';

const router = Router();

// --- Public Routes ---
// Get all products (with optional query params like ?category=...)
router.get('/get-products', getAllProducts);

// Get a single product by ID
router.get('/details/:id', getProductDetails);


// --- Protected Routes (Requires Login) ---
// Create a new product
router.post('/create', authMiddleware, upload.array('productImages', 5), createProduct);

// Update an existing product
// Note: We use .patch or .put; .patch is usually better for partial updates
router.patch('/update/:id', authMiddleware, upload.array('productImages', 5), updateProduct);

// Delete a product
router.delete('/delete/:id', authMiddleware, deleteProduct);

export default router;