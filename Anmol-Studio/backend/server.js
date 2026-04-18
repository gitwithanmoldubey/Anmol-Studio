import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

/**
 * Forever E-commerce Backend Server
 * --------------------------------
 * This script initializes the Express application, connects to the database,
 * and sets up the necessary middleware and routes.
 */

const app = express()
const port = process.env.PORT || 4000

// Connect to Database and External Services
const initializeServices = async () => {
    try {
        await connectDB()
        await connectCloudinary()
        console.log('✅ Services Initialized: Database and Cloudinary are ready.')
    } catch (error) {
        console.error('❌ Service Initialization Failed:', error.message)
        process.exit(1)
    }
}

initializeServices()

// Middleware Configuration
app.use(express.json())
app.use(cors())

// API Routes
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

/**
 * Health Check Endpoint
 * Useful for monitoring and deployment verification
 */
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        message: 'Forever Backend API is active',
        timestamp: new Date().toISOString()
    })
})

// Start the server
app.listen(port, () => {
    console.log(`\n🚀 Server is cruising on PORT: ${port}`)
    console.log(`🔗 Local Address: http://localhost:${port}\n`)
})