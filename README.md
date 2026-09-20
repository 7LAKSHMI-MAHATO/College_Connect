# College Connect 🎓

A full-stack college campus management platform that connects students and administrators through a centralized web application.

College Connect provides separate student and administrator workflows for managing notices, complaints, events, learning resources, student requests, and profiles.

---

## 🚀 Live Project

**Frontend:**  
https://college-connect-fawn.vercel.app/

**Backend API:**  
https://college-connect-backend-axcd.onrender.com/

---

## ✨ Features

### 👨‍🎓 Student Features

- Student registration and login
- JWT-based authentication
- Student dashboard
- View college notices
- Submit and track complaints
- View upcoming college events
- Access learning resources
- Submit student requests
- Track request status
- View and update profile
- Upload profile image

### 👨‍💼 Admin Features

- Admin authentication
- Administrative dashboard
- View platform statistics
- Manage notices
- Manage events
- Manage learning resources
- View and manage student complaints
- Update complaint status
- View and manage student requests
- Update request status
- Role-based access control

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer

### Cloud Services

- MongoDB Atlas
- ImageKit
- Render
- Vercel

---

## 🏗️ Project Architecture


College_Connect
│
├── Frontend
│   ├── src
│   │   ├── pages
│   │   ├── assets
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   └── package.json
│
├── Backend
│   ├── src
│   │   ├── config
│   │   ├── models
│   │   ├── routes
│   │   ├── controllers
│   │   ├── middleware
│   │   └── app.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
