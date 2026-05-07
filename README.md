# 🍔 FOODY — Food Delivery, Delivered Fast

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/status-active-brightgreen?style=for-the-badge" />
</p>

<p align="center">
  <b>Order your favorite meals from local restaurants — hot, fresh, and at your door in minutes.</b>
</p>

---

## 📱 What is FOODY?

**FOODY** is a modern food delivery platform that connects hungry customers with the best local restaurants in their city. Browse menus, customize your order, pay securely, and track your delivery in real time — all from one sleek app.

Whether you're craving pizza at midnight or a healthy salad for lunch, FOODY has you covered. 🌮🍕🥗🍜

---

## ✨ Features

### For Customers
- 🔍 **Smart Search** — Find restaurants by cuisine, dish name, rating, or distance
- 🗺️ **Real-Time Tracking** — Live GPS tracking from restaurant to your door
- 🛒 **Easy Ordering** — Customize meals, add extras, and apply promo codes
- 💳 **Secure Payments** — Credit/debit cards, Apple Pay, Google Pay, and cash on delivery
- ⭐ **Ratings & Reviews** — Rate your meal and delivery experience
- 📦 **Order History** — Reorder your favorites with a single tap
- 🔔 **Live Notifications** — Real-time updates at every step of your order

### For Restaurants
- 📊 **Dashboard** — Manage menu, pricing, and availability in real time
- 🧾 **Order Management** — Accept, prepare, and track incoming orders
- 📈 **Analytics** — Sales reports, peak hours, and customer insights
- 🏷️ **Promotions** — Create deals, discounts, and featured listings

### For Delivery Drivers
- 📍 **Smart Routing** — Optimized delivery routes to save time and fuel
- 💰 **Earnings Tracker** — Real-time earnings dashboard and payout history
- 🕐 **Flexible Hours** — Go online and offline whenever you want

---

## 🖼️ Screenshots

| Home Screen | Restaurant Menu | Live Tracking |
|:-----------:|:---------------:|:-------------:|
| Browse nearby restaurants with top picks, deals, and categories | Full menu with photos, descriptions, and customization options | Watch your driver navigate to you in real time on the map |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Mobile (iOS & Android) | React Native |
| Web App | React.js + Tailwind CSS |
| Backend API | Node.js + Express |
| Database | PostgreSQL + Redis (caching) |
| Real-Time | Socket.IO |
| Maps & Routing | Google Maps API |
| Payments | Stripe |
| Authentication | JWT + OAuth 2.0 (Google, Facebook) |
| Storage | AWS S3 |
| Notifications | Firebase Cloud Messaging (FCM) |
| Containerization | Docker + Kubernetes |

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 18.x
npm >= 9.x
PostgreSQL >= 15
Redis >= 7
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/foody-app/foody.git
cd foody

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your values in .env

# 4. Set up the database
npm run db:migrate
npm run db:seed

# 5. Start the development server
npm run dev
```

The app will be running at `http://localhost:3000`

### Environment Variables

```env
# App
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/foody_db
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id

# Payments
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Maps
GOOGLE_MAPS_API_KEY=your_maps_api_key

# Storage
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET=foody-media

# Notifications
FIREBASE_SERVER_KEY=your_firebase_key
```

---

## 📁 Project Structure

```
foody/
├── client/                 # React.js web app
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-level components
│   │   ├── store/          # Redux state management
│   │   └── utils/          # Helper functions
│
├── mobile/                 # React Native app
│   ├── src/
│   │   ├── screens/        # App screens
│   │   ├── navigation/     # Stack & tab navigators
│   │   └── components/     # Shared components
│
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── services/       # Business logic (payments, maps, etc.)
│   │   └── sockets/        # Real-time event handlers
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🔌 API Overview

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in and receive a JWT |
| `POST` | `/api/auth/refresh` | Refresh access token |
| `POST` | `/api/auth/logout` | Invalidate session |

### Restaurants
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/restaurants` | List nearby restaurants |
| `GET` | `/api/restaurants/:id` | Get restaurant details & menu |
| `GET` | `/api/restaurants/search` | Search by name, cuisine, or dish |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/orders` | Place a new order |
| `GET` | `/api/orders/:id` | Get order details |
| `GET` | `/api/orders/:id/track` | Get live driver location |
| `PATCH` | `/api/orders/:id/cancel` | Cancel an order |

### User
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/users/me` | Get current user profile |
| `PATCH` | `/api/users/me` | Update profile |
| `GET` | `/api/users/me/orders` | Order history |
| `GET` | `/api/users/me/addresses` | Saved addresses |

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# Test coverage report
npm run test:coverage
```

---

## 🐳 Docker

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop all services
docker-compose down
```

---

## 🗺️ Roadmap

- [x] User authentication & profiles
- [x] Restaurant browsing & search
- [x] Cart & checkout flow
- [x] Stripe payment integration
- [x] Real-time order tracking
- [x] Ratings & reviews
- [ ] AI-powered meal recommendations
- [ ] Group ordering (split bills with friends)
- [ ] Subscription plan — FOODY Pass (free delivery)
- [ ] Dark mode
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request


