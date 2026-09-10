import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'

/**
 * Product Controller
 * -------------------
 * This controller handles all operations related to product management,
 * including adding, listing, and removing products.
 */

/**
 * Add a new product to the catalog
 * @route POST /api/product/add
 */
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        // Extract Images from Request Files
        const image1 = req.files?.image1?.[0]
        const image2 = req.files?.image2?.[0]
        const image3 = req.files?.image3?.[0]
        const image4 = req.files?.image4?.[0]

        // Filter out undefined images
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        if (images.length === 0) {
            return res.status(400).json({ success: false, message: "At least one product image is required." })
        }

        console.log(`📦 Processing new product: "${name}"`)

        // Upload Images to Cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                return result.secure_url
            })
        )

        // Construct Product Data object
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestseller === "true" || bestseller === true,
            sizes: JSON.parse(sizes || "[]"),
            image: imagesUrl,
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save();

        console.log(`🏠 Product created successfully: ${product._id}`)

        res.json({ 
            success: true, 
            message: "Product added successfully",
            productId: product._id
        })

    } catch (error) {
        console.error("❌ Add Product Error:", error.message)
        res.status(500).json({ success: false, message: "Internal server error while adding product. Please try again." })
    }
}

/**
 * List all products from the catalog
 * @route GET /api/product/list
 */
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({}).sort({ date: -1 }); // Newest first
        res.json({ success: true, products })
    } catch (error) {
        console.error("❌ List Products Error:", error.message)
        res.status(500).json({ success: false, message: "Unable to fetch product list." })
    }
}

/**
 * Remove a product from the catalog
 * @route POST /api/product/remove
 */
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is required for removal." })
        }

        const deletedProduct = await productModel.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found." })
        }

        console.log(`🗑️ Product removed: ${id}`)
        res.json({ success: true, message: "Product has been successfully removed" })

    } catch (error) {
        console.error("❌ Remove Product Error:", error.message)
        res.status(500).json({ success: false, message: "Failed to remove product." })
    }
}

/**
 * Fetch information for a single product
 * @route POST /api/product/single
 */
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId)
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." })
        }

        res.json({ success: true, product })

    } catch (error) {
        console.error("❌ Single Product Error:", error.message)
        res.status(500).json({ success: false, message: "Error fetching product details." })
    }
}

export { addProduct, listProduct, removeProduct, singleProduct }