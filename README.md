# 🛒 NovaCart

A production-ready Full Stack MERN E-commerce application featuring JWT authentication, role-based authorization, secure cookie-based sessions, Cloudinary image uploads, shopping cart, wishlist, order management, and an admin dashboard.

🔗 **Live Demo:** https://novacart-ss.vercel.app

💻 **GitHub Repository:** https://github.com/shreyansh6678/NovaCart

---

## ✨ Features

### 👤 Authentication
- User Registration
- User Login & Logout
- JWT Authentication
- Secure HTTP-only Cookies
- Protected Routes
- Role-Based Authorization

### 🛍️ Customer Features
- Browse Products
- Search Products
- Category Filtering
- Price Filtering
- Sorting
- Pagination
- Product Details
- Shopping Cart
- Wishlist
- Place Orders
- View Order History
- Update Profile
- Change Password

### 👨‍💼 Admin Features
- Admin Dashboard
- Add Products
- Update Products
- Delete Products
- Manage Categories
- View All Orders
- Update Order Status
- View Registered Users

---

## 🚀 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS3
- React Hot Toast
- RC Slider

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- MVC Architecture
- Cloudinary
- Multer
- Cookie Parser

### Deployment
- Vercel
- Render
- MongoDB Atlas

---

## 📁 Folder Structure

```
NovaCart/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── app.js
│   │
│   └── package.json
│
└── README.md
```
## 🏗 Architecture

Frontend (React)
        │
        ▼
REST APIs (Express.js)
        │
        ▼
MongoDB Atlas
        │
        ▼
Cloudinary
---

## 🛠️ Installation

### Clone Repository

```bash
git clone https://github.com/shreyansh6678/NovaCart.git
```

```
cd novacart
```

---

### Install Frontend

```bash
cd frontend
npm install
```

Run

```bash
npm run dev
```

---

### Install Backend

```bash
cd backend
npm install
```

Run

```bash
npm start
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_secret

ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_secret

REFRESH_TOKEN_EXPIRY=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

CORS_ORIGIN=http://localhost:5173

NODE_ENV=development
```

---

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

---

## 📌 REST APIs

NovaCart includes **30+ RESTful APIs** covering:

- Authentication
- Products
- Categories
- Shopping Cart
- Wishlist
- Orders
- User Profile
- Admin Dashboard

---

## 📈 Key Highlights

- Full-stack MERN Architecture
- MVC Design Pattern
- JWT Authentication
- Role-Based Authorization
- Secure Cookie Authentication
- Cloudinary Image Upload
- Responsive Design
- Search, Filtering & Pagination
- Production Deployment
- 30+ REST APIs

---

## 🎯 Future Improvements

- Razorpay / Stripe Payment Integration
- Product Reviews & Ratings
- Email Verification
- Forgot Password
- Coupons & Discounts
- Inventory Analytics
- Sales Reports
- Dark Mode

---
## 📚 What I Learned

While building NovaCart, I gained hands-on experience with:

- JWT Authentication
- Role-Based Authorization
- MVC Architecture
- REST API Design
- Cloudinary Integration
- Cookie-Based Authentication
- Deployment using Vercel & Render
- CORS & Production Configuration

---

## 👨‍💻 Author

**Shreyansh Sharma**

📧 Email: shreyanshsharma678@gmail.com

💼 LinkedIn: https://www.linkedin.com/in/shreyansh678

🐙 GitHub: https://github.com/shreyansh6678

🌐 Portfolio: https://portfolio-by-ss.vercel.app

---
## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork this repository and submit a pull request.

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
