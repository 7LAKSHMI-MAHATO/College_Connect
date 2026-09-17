# 🎓 College Connect

A full-stack campus management and student support platform designed to connect students and administrators through a centralized web application.

College Connect provides modules for authentication, student profiles, notices, complaints, events, study resources, student requests, and administrative management.

---

## 🚀 Features

### 👨‍🎓 Student Features

- Student registration and login
- JWT-based authentication
- Student profile management
- Profile image upload
- View college notices
- Submit and track complaints
- View upcoming college events
- Access study resources
- Submit student requests
- Track complaint and request status
- Secure logout

### 👨‍💼 Admin Features

- Admin authentication
- Admin dashboard with statistics
- Notice management
- Complaint management
- Complaint status updates
- Event management
- Resource management
- Student request management
- Request status updates
- Role-based access control

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- HTML
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer

### Image Storage

- ImageKit

### Development Tools

- VS Code
- Postman
- Git
- GitHub

---

## 🏗️ Project Architecture

```text
College_Connect
│
├── Backend
│   ├── src
│   │   ├── config
│   │   │   ├── db.js
│   │   │   └── imagekit.js
│   │   │
│   │   ├── models
│   │   │   ├── user.model.js
│   │   │   ├── profile.model.js
│   │   │   ├── notice.model.js
│   │   │   ├── complaint.model.js
│   │   │   ├── event.model.js
│   │   │   ├── resource.model.js
│   │   │   └── request.model.js
│   │   │
│   │   ├── controllers
│   │   │   ├── user.controller.js
│   │   │   ├── auth.controller.js
│   │   │   ├── profile.controller.js
│   │   │   ├── notice.controller.js
│   │   │   ├── complaint.controller.js
│   │   │   ├── event.controller.js
│   │   │   ├── resource.controller.js
│   │   │   ├── request.controller.js
│   │   │   └── admin.controller.js
│   │   │
│   │   ├── routes
│   │   │   ├── user.routes.js
│   │   │   ├── profile.routes.js
│   │   │   ├── notice.routes.js
│   │   │   ├── complaint.routes.js
│   │   │   ├── event.routes.js
│   │   │   ├── resource.routes.js
│   │   │   ├── request.routes.js
│   │   │   └── admin.routes.js
│   │   │
│   │   ├── middleware
│   │   │   ├── auth.middleware.js
│   │   │   └── role.middleware.js
│   │   │
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── Frontend
    ├── src
    │   ├── pages
    │   ├── assets
    │   ├── App.jsx
    │   ├── ProtectedRoute.jsx
    │   ├── App.css
    │   └── index.css
    │
    ├── package.json
    └── vite.config.js
