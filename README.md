
# 📅 Event Booking System

An event management platform where users can browse upcoming company events, register, cancel, and receive timely notifications. Designed with scalability in mind, combining SQL, MongoDB, Redis, and RabbitMQ for robust performance.

---

## 🚀 Features

* **User Registration**: Sign up for company events (seminars, happy hours, etc.).
* **Capacity Control**: Deal room closes automatically when event capacity is reached.
* **Cancellations**: Free up seats and update availability in real-time.
* **Event Feedback**: Feedback forms stored in **MongoDB** after 24 hours.
* **Hot Events**: Events with <10 seats left cached in **Redis** for quick access.
* **Notifications**: Registration confirmation + reminder email sent via **RabbitMQ** queue.
* **UI**: React-based monthly calendar with real-time seat availability and “Register” button.

---

## 🛠️ Tech Stack

### Backend

* **Node.js + Fastify** (API server)
* **SQL (PostgreSQL / MySQL)** → Event + Registration data
* **MongoDB** → Post-event feedback forms
* **Redis** → Cache for “hot events”
* **RabbitMQ** → Queue for confirmation + reminder emails

### Frontend

* **React** with **react-big-calendar** → Monthly event calendar
* Real-time seat availability updates

---

## 📂 Project Structure

```
event-booking-system/
├── client/                # React UI
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/
│   └── package.json
├── server/                # Backend API
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/          # Redis, RabbitMQ, email service
│   └── server.js
├── docker-compose.yml     # Services orchestration
├── README.md
└── package.json
```

---

## ⚙️ Setup

### 1. Clone repository

```bash
git clone https://github.com/your-username/event-booking-system.git
cd event-booking-system
```

### 2. Start services with Docker

```bash
docker-compose up -d
```

This will spin up:

* SQL Database
* MongoDB
* Redis
* RabbitMQ
* API server
* React client

### 3. Install dependencies

For **backend**:

```bash
cd server
npm install
```

For **frontend**:

```bash
cd client
npm install
```

### 4. Run locally

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm start
```

---

## 🔄 Workflow

1. User registers for an event via React UI.
2. SQL DB updates → if capacity full, registration closes.
3. If <10 seats left → Redis caches event as “hot”.
4. RabbitMQ queues email confirmation + reminder (24h before).
5. After event → Feedback form stored in MongoDB.

---

## 📧 Notifications

* **On Registration** → Instant confirmation email.
* **Reminder** → Sent 24h before event.

---

## 🧑‍💻 Contributing

1. Fork the repo
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add feature'`
4. Push branch: `git push origin feature/your-feature`
5. Submit PR

---

## 📜 License

MIT License.

---

Would you like me to also include **example `.env` file configuration** (for SQL, Redis, RabbitMQ, Mongo, SMTP), so developers can run it more easily?
