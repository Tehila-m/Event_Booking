---

# 📌 Event Booking System

A full-stack event booking system where users can:

* Browse upcoming company events (seminars, happy hours, etc.).
* Register or cancel registration (capacity enforced).
* Receive confirmation & reminder emails.
* Submit feedback after attending events.

---

## ⚙️ Tech Stack

**Backend (server/):**

* **Fastify** (API server)
* **PostgreSQL / MySQL (SQL)** → Users, Events, Registrations
* **MongoDB** → Feedback forms
* **Redis** → Cache for hot events (capacity < 10)
* **RabbitMQ** → Email queue (confirmation + reminder)

**Frontend (client/):**

* **React + Vite**
* **React Query** (real-time availability)
* **TailwindCSS** (UI)
* **Axios** (API calls)
* **React Router** (routing)

---

## 📂 Project Structure

```
project-root/
│── server/               # Fastify backend
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/       # SQL, Mongo, Redis, RabbitMQ
│   │   ├── models/       # Sequelize + Mongoose models
│   │   ├── routes/       # REST routes
│   │   ├── controllers/  # Logic
│   │   └── middlewares/
│   └── package.json
│
│── client/               # React frontend
│   ├── src/
│   │   ├── api/          # Axios services
│   │   ├── components/   # Calendar, EventCard, FeedbackForm
│   │   ├── context/      # AuthContext
│   │   ├── hooks/        # useEvents (real-time updates)
│   │   ├── pages/        # Events, Login, Register, MyRegistrations
│   │   └── App.jsx       # Routing
│   └── package.json
│
└── README.md
```

---

## 🚀 Features

* **Events Calendar** → Displays all monthly events.
* **Register/Cancel** → Real-time seat availability with Redis.
* **Hot Events Badge** → Shows when <10 seats left.
* **Email Notifications** → RabbitMQ sends confirmation + reminder (24h before).
* **Feedback** → Users submit feedback after the event (stored in MongoDB).
* **Authentication** → Login/Register to manage your bookings.
* **My Registrations Page** → See and cancel your own registrations.

---

## 🛠️ Setup & Installation

### 1️⃣ Clone the project

```bash
git clone https://github.com/your-repo/event-booking-system.git
cd event-booking-system
```

---

### 2️⃣ Backend Setup (server/)

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=4000

# SQL Database
SQL_DB_HOST=localhost
SQL_DB_USER=root
SQL_DB_PASS=secret
SQL_DB_NAME=events

# MongoDB
MONGO_URI=mongodb://localhost:27017/event-feedback

# Redis
REDIS_URL=redis://localhost:6379

# RabbitMQ
RABBITMQ_URL=amqp://localhost
```

Run migrations & start server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup (client/)

```bash
cd client
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:4000/api
```

Run frontend:

```bash
npm run dev
```

---

## 🔗 API Endpoints (Server)

### Users

* `POST /api/users/register` → Register
* `POST /api/users/login` → Login
* `GET /api/users/me` → Current user

### Events

* `GET /api/events` → List events
* `GET /api/events/:id` → Single event

### Registrations

* `POST /api/registrations` → Register for event
* `DELETE /api/registrations/:eventId` → Cancel registration
* `GET /api/registrations/me` → My registrations

### Feedback

* `POST /api/feedback` → Submit feedback

---

## 📸 Frontend Pages

* **EventsPage** → Calendar with events + register button.
* **MyRegistrationsPage** → See and cancel your registrations.
* **LoginPage** → Sign in.
* **RegisterPage** → Create new account.
* **FeedbackPage** → Submit feedback.

---

## ✅ How it Works (Flow)

1. **User views calendar** → `/events`
2. **Registers for event** → API checks SQL capacity, updates Redis cache.
3. **RabbitMQ** → Sends confirmation email & schedules reminder.
4. **Day of event** → User attends.
5. **After event** → User submits feedback (stored in Mongo).
6. **Hot Events** → Redis ensures events with <10 seats show as "HOT!".

---

## 🔮 Future Improvements

* Admin dashboard (create/manage events).
* Google Calendar / Outlook integration.
* Waitlist system when events are full.
* Push notifications for reminders.

---

