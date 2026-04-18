import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import productModel from "./models/productModel.js";

// Load Environment Variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`);
        console.log("✅ MongoDB Connected (e-commerce)");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

// Raw Products Data (Simplified from assets.js)
const rawProducts = [
    { name: "Women Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt...", price: 100, images: ["p_img1.png"], category: "Women", subCategory: "Topwear", sizes: ["S", "M", "L"], bestseller: true },
    { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt...", price: 200, images: ["p_img2_1.png", "p_img2_2.png", "p_img2_3.png", "p_img2_4.png"], category: "Men", subCategory: "Topwear", sizes: ["M", "L", "XL"], bestseller: true },
    { name: "Girls Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt...", price: 220, images: ["p_img3.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "L", "XL"], bestseller: true },
    { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt...", price: 110, images: ["p_img4.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "XXL"], bestseller: true },
    { name: "Women Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt...", price: 130, images: ["p_img5.png"], category: "Women", subCategory: "Topwear", sizes: ["M", "L", "XL"], bestseller: true },
    { name: "Girls Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt...", price: 140, images: ["p_img6.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "L", "XL"], bestseller: true },
    { name: "Men Tapered Fit Flat-Front Trousers", description: "A lightweight, usually knitted, pullover shirt...", price: 190, images: ["p_img7.png"], category: "Men", subCategory: "Bottomwear", sizes: ["S", "L", "XL"], bestseller: false },
    { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt...", price: 140, images: ["p_img8.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Girls Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt...", price: 100, images: ["p_img9.png"], category: "Kids", subCategory: "Topwear", sizes: ["M", "L", "XL"], bestseller: false },
    { name: "Men Tapered Fit Flat-Front Trousers", description: "A lightweight, usually knitted, pullover shirt...", price: 110, images: ["p_img10.png"], category: "Men", subCategory: "Bottomwear", sizes: ["S", "L", "XL"], bestseller: false },
    { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt...", price: 120, images: ["p_img11.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L"], bestseller: false },
    { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt...", price: 150, images: ["p_img12.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Women Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt...", price: 130, images: ["p_img13.png"], category: "Women", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Boy Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt...", price: 160, images: ["p_img14.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Men Tapered Fit Flat-Front Trousers", description: "A lightweight, usually knitted, pullover shirt...", price: 140, images: ["p_img15.png"], category: "Men", subCategory: "Bottomwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Girls Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt...", price: 170, images: ["p_img16.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Men Tapered Fit Flat-Front Trousers", description: "A lightweight, usually knitted, pullover shirt...", price: 150, images: ["p_img17.png"], category: "Men", subCategory: "Bottomwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Boy Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt...", price: 180, images: ["p_img18.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Boy Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt...", price: 160, images: ["p_img19.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Women Palazzo Pants with Waist Belt", description: "A lightweight, usually knitted, pullover shirt...", price: 190, images: ["p_img20.png"], category: "Women", subCategory: "Bottomwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Women Zip-Front Relaxed Fit Jacket", description: "A lightweight, usually knitted, pullover shirt...", price: 170, images: ["p_img21.png"], category: "Women", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Women Palazzo Pants with Waist Belt", description: "A lightweight, usually knitted, pullover shirt...", price: 200, images: ["p_img22.png"], category: "Women", subCategory: "Bottomwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Boy Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt...", price: 180, images: ["p_img23.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Boy Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt...", price: 210, images: ["p_img24.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Girls Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt...", price: 190, images: ["p_img25.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Women Zip-Front Relaxed Fit Jacket", description: "A lightweight, usually knitted, pullover shirt...", price: 220, images: ["p_img26.png"], category: "Women", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Girls Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt...", price: 200, images: ["p_img27.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Men Slim Fit Relaxed Denim Jacket", description: "A lightweight, usually knitted, pullover shirt...", price: 230, images: ["p_img28.png"], category: "Men", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Women Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt...", price: 210, images: ["p_img29.png"], category: "Women", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Girls Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt...", price: 240, images: ["p_img30.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt...", price: 220, images: ["p_img31.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt...", price: 250, images: ["p_img32.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Girls Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt...", price: 230, images: ["p_img33.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Women Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt...", price: 260, images: ["p_img34.png"], category: "Women", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Women Zip-Front Relaxed Fit Jacket", description: "A lightweight, usually knitted, pullover shirt...", price: 240, images: ["p_img35.png"], category: "Women", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Women Zip-Front Relaxed Fit Jacket", description: "A lightweight, usually knitted, pullover shirt...", price: 270, images: ["p_img36.png"], category: "Women", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Women Round Neck Cotton Top", description: "A lightweight, usually knitted, pullover shirt...", price: 250, images: ["p_img37.png"], category: "Women", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt...", price: 280, images: ["p_img38.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Men Printed Plain Cotton Shirt", description: "A lightweight, usually knitted, pullover shirt...", price: 260, images: ["p_img39.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Men Slim Fit Relaxed Denim Jacket", description: "A lightweight, usually knitted, pullover shirt...", price: 290, images: ["p_img40.png"], category: "Men", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Men Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt...", price: 270, images: ["p_img41.png"], category: "Men", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Boy Round Neck Pure Cotton T-shirt", description: "A lightweight, usually knitted, pullover shirt...", price: 300, images: ["p_img42.png"], category: "Kids", subCategory: "Topwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Kid Tapered Slim Fit Trouser", description: "A lightweight, usually knitted, pullover shirt...", price: 280, images: ["p_img43.png"], category: "Kids", subCategory: "Bottomwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Women Zip-Front Relaxed Fit Jacket", description: "A lightweight, usually knitted, pullover shirt...", price: 310, images: ["p_img44.png"], category: "Women", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Men Slim Fit Relaxed Denim Jacket", description: "A lightweight, usually knitted, pullover shirt...", price: 290, images: ["p_img45.png"], category: "Men", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Men Slim Fit Relaxed Denim Jacket", description: "A lightweight, usually knitted, pullover shirt...", price: 320, images: ["p_img46.png"], category: "Men", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Kid Tapered Slim Fit Trouser", description: "A lightweight, usually knitted, pullover shirt...", price: 300, images: ["p_img47.png"], category: "Kids", subCategory: "Bottomwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Men Slim Fit Relaxed Denim Jacket", description: "A lightweight, usually knitted, pullover shirt...", price: 330, images: ["p_img48.png"], category: "Men", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Kid Tapered Slim Fit Trouser", description: "A lightweight, usually knitted, pullover shirt...", price: 310, images: ["p_img49.png"], category: "Kids", subCategory: "Bottomwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Kid Tapered Slim Fit Trouser", description: "A lightweight, usually knitted, pullover shirt...", price: 340, images: ["p_img50.png"], category: "Kids", subCategory: "Bottomwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Women Zip-Front Relaxed Fit Jacket", description: "A lightweight, usually knitted, pullover shirt...", price: 320, images: ["p_img51.png"], category: "Women", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], bestseller: false },
    { name: "Men Slim Fit Relaxed Denim Jacket", description: "A lightweight, usually knitted, pullover shirt...", price: 350, images: ["p_img52.png"], category: "Men", subCategory: "Winterwear", sizes: ["S", "M", "L", "XL"], bestseller: false }
];

// Helper to generate logical descriptions based on product info
const getDescription = (item) => {
    if (item.name.includes("T-shirt") || item.name.includes("Top")) {
        return `A breathable and soft ${item.category} ${item.subCategory}, perfect for everyday wear. Featuring a classic neckline and a comfortable fit, it captures the essence of modern fashion from Anmol Studio.`;
    } else if (item.name.includes("Trouser") || item.name.includes("Pants")) {
        return `Sophisticated ${item.category} ${item.subCategory} with a refined fit. Ideal for both office and casual evening wear, these are crafted for durability and style.`;
    } else if (item.name.includes("Jacket")) {
        return `A cozy and stylish ${item.category} Jacket with a relaxed fit. Keeps you warm during chilly days without compromising on the premium Anmol Studio aesthetic.`;
    } else if (item.name.includes("Shirt")) {
        return `Smart ${item.category} shirt featuring a lightweight and breathable fabric. A versatile wardrobe essential perfect for all seasons.`;
    }
    return `Premium ${item.category} ${item.subCategory} from Anmol Studio, designed with quality and comfort in mind.`;
};

// Realistic review pool (mixed ratings for realism)
const reviewPool = [
    { username: "Priya Sharma", location: "Mirzapur", rating: 5, comment: "Absolutely love this! The fabric quality is top-notch and the fit is perfect. Will definitely order again from Anmol Studio.", date: "2026-03-15" },
    { username: "Rahul Verma", location: "Delhi", rating: 4, comment: "Good product overall. The stitching is solid and delivery was on time. Slight color difference from the photo but still happy.", date: "2026-03-22" },
    { username: "Sneha Dubey", location: "Mirzapur", rating: 5, comment: "Excellent quality! I bought this as a gift and the recipient loved it. The packaging was also very premium.", date: "2026-02-10" },
    { username: "Akash Singh", location: "Varanasi", rating: 3, comment: "Product is decent but the size runs a bit small. Ordered an L thinking it would fit well, had to exchange for XL. Customer support was helpful though.", date: "2026-03-01" },
    { username: "Kavita Yadav", location: "Allahabad", rating: 4, comment: "Nice material and great design. The colour is exactly as shown in the pictures. Would be 5 stars if the delivery was faster.", date: "2026-03-28" },
    { username: "Mohit Tiwari", location: "Kanpur", rating: 5, comment: "Best purchase I've made online in a while. The comfort level is amazing, wearing it all day feels effortless.", date: "2026-02-14" },
    { username: "Anjali Mishra", location: "Mirzapur", rating: 4, comment: "Good quality for the price. Looks exactly like shown. I'll recommend Anmol Studio to my friends for sure!", date: "2026-04-01" },
    { username: "Vikram Pandey", location: "Lucknow", rating: 3, comment: "Average experience. Product quality is fine but took longer than expected to arrive. Would like faster shipping next time.", date: "2026-03-18" },
];

// Generate 5 diverse reviews for each product
const generateReviews = () => {
    const shuffled = [...reviewPool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
};

const seedDB = async () => {
    await connectDB();

    // Clear Existing Products
    await productModel.deleteMany({});
    console.log("🗑️ Database Cleared");

    const assetsPath = path.join(__dirname, "../frontend/src/assets");

    for (let i = 0; i < rawProducts.length; i++) {
        const item = rawProducts[i];
        console.log(`🚀 Seeding Product ${i + 1}/${rawProducts.length}: ${item.name}`);

        try {
            // Upload images to Cloudinary
            const imagesUrl = await Promise.all(
                item.images.map(async (imgName) => {
                    const imgPath = path.join(assetsPath, imgName);
                    if (!fs.existsSync(imgPath)) {
                        console.warn(`⚠️ Warning: Image ${imgName} not found at ${imgPath}`);
                        return null;
                    }
                    const result = await cloudinary.uploader.upload(imgPath, { resource_type: "image" });
                    return result.secure_url;
                })
            );

            // Filter out null images (not found)
            const filteredImages = imagesUrl.filter(url => url !== null);

            if (filteredImages.length === 0) {
                console.error(`❌ Failed to upload any images for ${item.name}. Skipping.`);
                continue;
            }

            // Create and save product
            const newProduct = new productModel({
                name: item.name,
                description: getDescription(item),
                price: item.price,
                category: item.category,
                subCategory: item.subCategory,
                sizes: item.sizes,
                bestSeller: item.bestseller,
                image: filteredImages,
                date: Date.now(),
                reviews: generateReviews()
            });

            await newProduct.save();
            console.log(`✅ Seeded: ${item.name}`);
        } catch (error) {
            console.error(`❌ Error seeding ${item.name}:`, error.message);
        }
    }

    console.log("🎊 Seeding Complete!");
    process.exit();
};

seedDB();
