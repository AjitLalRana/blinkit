import ProductModel from '../models/product.model.js';
import { uploadProductImagesToCloudinary } from '../utils/uploadToCloudinary.js';

const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        if (!name || !description || !price) {
            return res.status(400).json({
                message: "Name, description and price are required",
                error: true,
                success: false
            });
        }
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({
                message: "At least one product image is required",
                error: true,
                success: false
            });
        }
        const uploadedImages = await uploadProductImagesToCloudinary(files);
        // Create a new product instance

        
        return res.status(201).json({
            message: "Product created successfully",
            error: false,
            success: true,
            // data: savedProduct
        });
    } catch (error) {
        console.log("Error creating product:", error);
        return res.status(500).json({
            message: "Internal server error: " + error.message,   
            error: true,
            success: false
        });

    }
};


export {
        createProduct,
}