import mongoose from "mongoose"
import dns from "dns"

dns.setDefaultResultOrder('ipv4first');

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("✅ MongoDB Connected");
    })

    mongoose.connection.on('error', (err) => {
        console.error("⚠️ MongoDB Connection Error:", err.message);
    })

    const uri = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017';
    const connectionUri = uri.includes('mongodb+srv') || uri.includes('/e-commerce') 
        ? uri 
        : `${uri.replace(/\/$/, '')}/e-commerce`;

    await mongoose.connect(connectionUri);
}

export default connectDB;