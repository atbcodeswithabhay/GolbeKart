# GolbeKart 🛒

GolbeKart is a modern, high-performance, full-stack E-commerce web application. It features a highly interactive and beautifully animated client interface built with React, Vite, Framer Motion, and GSAP, backed by a robust and secure Express server using Prisma ORM with an SQLite database.

**🔗 Live Website URL:** [https://client-seven-zeta-36.vercel.app](https://client-seven-zeta-36.vercel.app)

---

## 🚀 Tech Stack

### Client (Frontend)
- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & [React Redux](https://react-redux.js.org/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [GSAP (GreenSock)](https://gsap.com/)
- **API Client:** [Axios](https://axios-http.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)

### Server (Backend)
- **Runtime:** [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** SQLite (self-contained file database)
- **Authentication:** JWT (JSON Web Tokens) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Development Tooling:** [Nodemon](https://nodemon.io/)
- **Data Seeding:** [Faker.js](https://fakerjs.dev/)

---

## ✨ Features

- 🔐 **Secure Authentication**: User sign up, login, and authorization using JWT and password hashing.
- 📦 **Product Management**: View, filter, and search products across categories.
- 🛒 **Shopping Cart**: Fully functional persistent shopping cart state using Redux Toolkit.
- 💖 **Wishlist**: Save favorite products to personal wishlist.
- 📦 **Order Flow**: Order placement structure with payment method choices and address management.
- 🎨 **Premium UI/UX**: Fluid page transitions, magnetic animations, and interactive elements powered by Framer Motion and GSAP.

---

## 🛠️ Setup and Installation

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) installed on your system.

### 2. Clone and Setup Project

```bash
# Clone the repository
git clone https://github.com/atbcodeswithabhay/GolbeKart.git
cd GolbeKart
```

### 3. Server Configuration

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   Create a `.env` file in the `server` directory and add the following:
   ```env
   PORT=5000
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your_jwt_secret_key_here"
   ```
4. Run Prisma database migrations to set up SQLite schema:
   ```bash
   npx prisma db push
   ```
5. Seed the database with fake products and categories (optional):
   ```bash
   node scripts/seed.js
   ```

### 4. Client Configuration

1. Navigate to the `client` directory:
   ```bash
   cd ../client
   ```
2. Install client dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## 🏃 Running the Application

For the full experience, run both the backend server and frontend client concurrently:

- **Start Backend API:** Run `npm run dev` in the `server` directory. (Starts server at `http://localhost:5000`)
- **Start Frontend Client:** Run `npm run dev` in the `client` directory. (Starts frontend at `http://localhost:5173` or next available port)

---

## 📂 Project Structure

```
GolbeKart/
├── client/                 # Frontend React application
│   ├── public/             # Static public assets
│   ├── src/
│   │   ├── assets/         # App assets & images
│   │   ├── components/     # Reusable layout and UI components
│   │   ├── pages/          # Page views (Home, Shop, Cart, etc.)
│   │   ├── redux/          # Redux slices and store configuration
│   │   ├── App.jsx         # Main App router and layout
│   │   └── main.jsx        # App entry point
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                 # Backend Node/Express API
│   ├── controllers/        # Route controllers
│   ├── routes/             # Express API routes
│   ├── prisma/             # Prisma schema & migrations
│   ├── scripts/            # Database seed scripts
│   ├── utils/              # Helper utilities
│   ├── index.js            # Main backend entry point
│   └── package.json
└── README.md               # Project root documentation
```
