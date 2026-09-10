# 🏛️ Anmol Studio - System Architecture & Technical Documentation

Welcome to the technical documentation for **Anmol Studio**, a full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js), Vite, TailwindCSS, Cloudinary, Stripe, and Razorpay.

---

## 📐 Table of Contents
1. [Tech Stack & Dependencies](#-tech-stack--dependencies)
2. [Project Structure](#-project-structure)
3. [System Architecture & Data Flow](#-system-architecture--data-flow)
4. [Authentication & Authorization](#-authentication--authorization)
5. [Database Models (Mongoose Schemas)](#-database-models-mongoose-schemas)
6. [Payment Gateway Workflows](#-payment-gateway-workflows)
7. [API Endpoint Reference](#-api-endpoint-reference)
8. [Setup & Environment Configuration](#-setup--environment-configuration)

---

## 🛠️ Tech Stack & Dependencies

### **Frontend & Admin Applications**
- **Core:** React 18 (Vite build tool)
- **Routing:** `react-router-dom` v6
- **HTTP Client:** `axios`
- **Styling:** TailwindCSS
- **Toast Notifications:** `react-toastify`

### **Backend Service**
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js v5
- **Database:** MongoDB via Mongoose ORM
- **Media Storage:** Cloudinary SDK v2
- **File Uploads:** Multer
- **Security & Validation:** JSON Web Token (`jsonwebtoken`), `bcrypt`, `validator`
- **Payment Processing:** `stripe` SDK, `razorpay` SDK

---

## 📂 Project Structure

```
Anmol-Studio/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js    # Cloudinary storage initialization
│   │   └── mongodb.js       # MongoDB connection via Mongoose
│   ├── controllers/
│   │   ├── cartController.js     # Add, update, and get cart items
│   │   ├── orderController.js    # COD, Stripe, and Razorpay checkout & verification
│   │   ├── productController.js  # Add, edit, remove, list, single product
│   │   └── userController.js     # Login, register, admin auth
│   ├── middleware/
│   │   ├── adminAuth.js          # Admin role verification middleware
│   │   ├── auth.js               # JWT user authentication middleware
│   │   └── multer.js             # Multipart form-data image handler
│   ├── models/
│   │   ├── orderModel.js         # Orders database schema
│   │   ├── productModel.js       # Products database schema
│   │   └── userModels.js         # Users database schema
│   ├── routes/
│   │   ├── cartRoute.js
│   │   ├── orderRoute.js
│   │   ├── productRoute.js
│   │   └── userRoute.js
│   └── server.js                 # Server entry point & Express middleware setup
│
├── frontend/                     # User-facing E-Commerce React App
│   ├── src/
│   │   ├── assets/               # Branding assets & default data
│   │   ├── components/           # Navbar, Footer, Hero, SearchBar, RelatedProducts, etc.
│   │   ├── context/              # ShopContext global state provider
│   │   ├── pages/                # Home, Collection, Product, Cart, PlaceOrder, Orders, Verify, Wishlist
│   │   └── App.jsx
│
└── admin/                        # Admin Management Dashboard React App
    ├── src/
    │   ├── components/           # Navbar, Sidebar, Login modal
    │   ├── pages/                # Add Product, List Products, Edit Product, Manage Orders
    │   └── App.jsx
```

---

## 🔄 System Architecture & Data Flow

```
+-------------------+             +-------------------+             +--------------------+
|  User (Frontend)  | <---------> | Express.js Server | <---------> | MongoDB Database   |
|   React + Vite    |  REST API   |    (Node.js)      |  Mongoose   |  (Users/Orders/...) |
+-------------------+             +-------------------+             +--------------------+
          |                                 |                                 |
          |                                 | Cloudinary API                  |
          |                                 v                                 |
          |                       +-------------------+                       |
          |                       | Cloudinary Asset  |                       |
          |                       | Storage System    |                       |
          |                       +-------------------+                       |
          |                                                                   |
          | Stripe / Razorpay Checkout Page                                   |
          v                                                                   |
+-------------------+                                                         |
| Payment Gateways  | --------------------------------------------------------+
| Stripe & Razorpay |  Redirect / Verify Success Response
+-------------------+
```

---

## 🔐 Authentication & Authorization

1. **User Authentication:**
   - Password hashed using `bcrypt` (10 salt rounds).
   - JWT tokens generated with `{ id: user._id }` payload and `7d` expiration.
   - Sent via HTTP Header `token: <JWT_TOKEN>`.
   - Middleware `auth.js` decodes token and injects `req.body.userId`.

2. **Admin Authorization:**
   - Credentials checked against `process.env.ADMIN_EMAIL` and `process.env.ADMIN_PASSWORD`.
   - Admin JWT signed with `{ role: 'admin', email }`.
   - Middleware `adminAuth.js` validates that decoded `role === 'admin'`.

---

## 🗄️ Database Models (Mongoose Schemas)

### **User Model (`userModels.js`)**
- `name` (String, Required)
- `email` (String, Required, Unique)
- `password` (String, Required)
- `cartData` (Object, Default `{}`)
- `wishlist` (Array of Strings, Default `[]`)

### **Product Model (`productModel.js`)**
- `name` (String, Required)
- `description` (String, Required)
- `price` (Number, Required)
- `image` (Array of Strings, Required)
- `category` (String, Required)
- `subCategory` (String, Required)
- `sizes` (Array of Strings, Required)
- `bestSeller` (Boolean, Default `false`)
- `date` (Number, Required)

### **Order Model (`orderModel.js`)**
- `userId` (String, Required)
- `items` (Array, Required)
- `amount` (Number, Required)
- `address` (Object, Required)
- `status` (String, Default `'Order Placed'`)
- `paymentMethod` (String, Required)
- `payment` (Boolean, Default `false`)
- `date` (Number, Required)

---

## 💳 Payment Gateway Workflows

### **Stripe Workflow**
1. User clicks **Stripe** on checkout page -> Frontend calls `/api/order/stripe`.
2. Backend creates pending Order in DB and creates Stripe Checkout Session.
3. User redirects to Stripe hosted payment page.
4. On completion, Stripe redirects user back to `/verify?success=true&orderId=<ID>`.
5. Frontend calls `/api/order/verifyStripe` -> Backend marks order `payment: true` and clears `cartData`.

### **Razorpay Workflow**
1. User clicks **Razorpay** on checkout page -> Frontend calls `/api/order/razorpay`.
2. Backend creates pending Order in DB and creates Razorpay Order via Razorpay SDK.
3. Frontend opens Razorpay Checkout popup widget.
4. On success, Razorpay provides order ID -> Frontend calls `/api/order/verifyRazorpay` -> Backend updates DB.

---

## 📡 API Endpoint Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/user/register` | Public | Register a new user |
| `POST` | `/api/user/login` | Public | Login existing user |
| `POST` | `/api/user/admin` | Public | Admin login |
| `GET` | `/api/product/list` | Public | List all products |
| `POST` | `/api/product/single` | Public | Fetch single product details |
| `POST` | `/api/product/add` | Admin | Upload images to Cloudinary & create product |
| `POST` | `/api/product/update` | Admin | Update existing product details |
| `POST` | `/api/product/remove` | Admin | Delete a product |
| `POST` | `/api/cart/get` | User | Get current user's cart |
| `POST` | `/api/cart/add` | User | Add item & size to cart |
| `POST` | `/api/cart/update` | User | Update item quantity in cart |
| `POST` | `/api/order/place` | User | Place Cash on Delivery (COD) order |
| `POST` | `/api/order/stripe` | User | Initialize Stripe payment |
| `POST` | `/api/order/verifyStripe` | User | Verify Stripe payment callback |
| `POST` | `/api/order/razorpay` | User | Initialize Razorpay order |
| `POST` | `/api/order/verifyRazorpay` | User | Verify Razorpay payment callback |
| `POST` | `/api/order/userorders` | User | List logged-in user's orders |
| `POST` | `/api/order/list` | Admin | List all orders in system |
| `POST` | `/api/order/status` | Admin | Update status of an order |

---

## ⚙️ Setup & Environment Configuration

### Backend `.env` Template
```env
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/anmol-studio
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@anmolstudio.com
ADMIN_PASSWORD=adminpassword123
STRIPE_SECRET_KEY=sk_test_...
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Frontend `.env` Template
```env
VITE_BACKEND_URL=http://localhost:4000
```
