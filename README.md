[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19627509&assignment_repo_type=AssignmentRepo)

# 📰 Personalized News Aggregator API

A RESTful API built with Node.js, Express.js, JWT, and bcrypt that allows users to register, log in, set news preferences, and fetch news from external APIs like GNews. The app supports user authentication, preference management, article tracking (read/favorites), in-memory caching, and error handling.

---

## 🚀 Features

- ✅ JWT-based authentication
- ✅ Secure user registration/login with bcrypt
- ✅ User preference management (category, language)
- ✅ Integration with external News API (GNews)
- ✅ News article caching to reduce API calls
- ✅ Mark articles as read or favorite
- ✅ Search news by keyword
- ✅ Clean modular code (controllers, routes, middleware)
- ✅ Error handling and validation
- ✅ Unit + integration tests using Jest & Supertest

---

## 🏗 Project Structure

project-root/
│
├── controllers/
│ ├── authController.js
│ ├── newsController.js
│ └── userController.js
│
├── routes/
│ ├── authRoutes.js
│ ├── newsRoutes.js
│ └── userRoutes.js
│
├── middleware/
│ ├── authMiddleware.js
│ └── errorHandler.js
│
├── models/
│ └── User.js
│
│
│
├── .env
├── app.js
├── server.js
├── package.json
└── README.md


## ⚙️ Environment Variables

Create a `.env` file in the root:

PORT=5000
JWT_SECRET=your_jwt_secret
GNEWS_API_KEY=your_gnews_api_key


---

## 🧪 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test
