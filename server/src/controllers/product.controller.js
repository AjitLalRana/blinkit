import ProductModel from '../models/product.model.js';
import { uploadProductImagesToCloudinary } from '../utils/uploadToCloudinary.js';

const createProduct = async (req, res) => {
    try {
        const {
            name, description, price,
            unit, stock, discount, more_details, publish
        } = req.body;

        if (!name || !description || !price) {
            return res.status(400).json({ message: "Missing required fields", error: true });
        }

        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ message: "At least one image is required", error: true });
        }

        // 1. Upload to Cloudinary
        const uploadedImages = await uploadProductImagesToCloudinary(files);
        // Assuming your utility returns an array of strings (URLs)
        const imageUrls = uploadedImages.map(img => img.url || img);

        // 2. Save to DB
        const newProduct = new ProductModel({
            name,
            description,
            price,
            image: imageUrls,
            unit,
            stock,
            discount,
            more_details: more_details ? JSON.parse(more_details) : {},
            publish
        });

        const savedProduct = await newProduct.save();

        return res.status(201).json({
            message: "Product created successfully",
            data: savedProduct,
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, error: true });
    }
};

const getAllProducts = async (req, res) => {
    try {
        // Simple pagination & filtering
        const { category, limit = 10, page = 1 } = req.query;
        const skip = (page - 1) * limit;

        let query = { publish: true }; // Only show published products
        if (category) query.category = category;

        const products = await ProductModel.find(query)
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip(skip)
            // .populate("category subCategory");

        return res.status(200).json({
            success: true,
            data: products,
            total: await ProductModel.countDocuments(query)
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, error: true });
    }
};

const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id).populate("category subCategory");

        if (!product) {
            return res.status(404).json({ message: "Product not found", error: true });
        }

        return res.status(200).json({ success: true, data: product });
    } catch (error) {
        return res.status(500).json({ message: "Invalid ID or server error", error: true });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Note: If you're updating images, you'd handle file uploads here too
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );

        return res.status(200).json({
            message: "Product updated",
            success: true,
            data: updatedProduct
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, error: true });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Product deleted successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, error: true });
    }
};




export {
    createProduct,
    getAllProducts,
    getProductDetails,
    updateProduct,
    deleteProduct
};