# 📈 Zerodha Clone — Full-Stack Trading Platform

A full-stack clone of [Zerodha](https://zerodha.com/), India's largest stock broker, built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This project replicates the landing page, user dashboard, and backend API of the Zerodha trading platform.

---

## 🌟 Features

### 🏠 Landing Page (Frontend)
- **Home** — Hero section, awards, stats, pricing overview, and education
- **About** — Company history, vision, and team profiles
- **Products** — Kite, Console, Coin, Kite Connect API, Varsity with partner ecosystem
- **Pricing** — Transparent brokerage charges breakdown
- **Support** — Help topics, ticket creation, and FAQs
- **Signup** — User registration page

### 📊 Dashboard
- **Summary** — Account overview with equity and holdings P&L
- **Watchlist** — Real-time stock watchlist with buy/sell actions and doughnut chart
- **Holdings** — Portfolio holdings from MongoDB with bar chart visualization
- **Positions** — Current open positions with P&L tracking
- **Orders** — Order history and management
- **Funds** — Fund management with margin details
- **Buy Window** — Interactive buy order placement with quantity and price inputs

### 🔧 Backend API
- `GET /allHoldings` — Fetch all holdings from MongoDB
- `GET /allPositions` — Fetch all positions from MongoDB
- `POST /newOrder` — Place a new order

---

## 🏗️ Project Architecture

```
zerodha-clone/
├── frontend/          # Landing page (React.js) — Port 3000
│   ├── public/
│   └── src/
│       ├── landing_page/
│       │   ├── home/        # Hero, Awards, Stats, Pricing, Education
│       │   ├── about/       # Company info, Team
│       │   ├── products/    # Product showcase, Universe
│       │   ├── pricing/     # Pricing details, Brokerage calculator
│       │   ├── support/     # Support portal, Ticket creation
│       │   ├── signup/      # User registration
│       │   └── media/       # Images and assets
│       └── index.js         # App entry point with React Router
│
├── dashboard/         # Trading dashboard (React.js) — Port 3001
│   ├── public/
│   └── src/
│       ├── components/      # Dashboard, WatchList, Holdings, etc.
│       └── data/            # Static watchlist and positions data
│
├── backend/           # REST API (Express.js + MongoDB) — Port 3002
│   ├── model/               # Mongoose models
│   ├── schemas/             # Mongoose schemas
│   └── index.js             # Express server entry point
│
└── README.md
```

---

## 🛠️ Tech Stack

| Layer        | Technology                                      |
|--------------|------------------------------------------------|
| **Frontend** | React.js, React Router, Bootstrap 5, Font Awesome |
| **Dashboard**| React.js, Material UI, Chart.js, Axios          |
| **Backend**  | Node.js, Express.js, Mongoose, Passport.js      |
| **Database** | MongoDB                                          |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/zerodha-clone.git
cd zerodha-clone
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/zerodha
```

Start the backend server:

```bash
npm start
```

The backend API will run on **http://localhost:3002**

### 3. Setup Frontend (Landing Page)

```bash
cd frontend
npm install
npm start
```

The landing page will run on **http://localhost:3000**

### 4. Setup Dashboard

```bash
cd dashboard
npm install
npm start
```

The dashboard will run on **http://localhost:3001**

> **Note:** When starting the dashboard, React may ask to use a different port since 3000 is occupied. Press `Y` to use port 3001.

---

## 📦 Database Setup

To populate the database with sample data, uncomment the `/addHoldings` and `/addPositions` routes in `backend/index.js`, then visit:

- `http://localhost:3002/addHoldings` — Adds sample holding stocks
- `http://localhost:3002/addPositions` — Adds sample position data

After populating, you can re-comment those routes.

---

## 📸 Screenshots

### Landing Page
| Home | Products | Pricing |
|------|----------|---------|
| Hero section with CTA | Product showcase | Brokerage details |

### Dashboard
| Summary | Holdings | Watchlist |
|---------|----------|-----------|
| Account overview | Portfolio with chart | Stock watchlist |

---

## 📁 Environment Variables

| Variable     | Description                | Location        |
|-------------|---------------------------|-----------------|
| `MONGO_URL` | MongoDB connection string  | `backend/.env`  |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is for **educational purposes only**. It is not affiliated with or endorsed by Zerodha Broking Ltd. All trademarks and brand names belong to their respective owners.

---

## 🙏 Acknowledgments

- [Zerodha](https://zerodha.com/) — For the design inspiration
- [Bootstrap](https://getbootstrap.com/) — CSS framework
- [Material UI](https://mui.com/) — Dashboard component library
- [Chart.js](https://www.chartjs.org/) — Chart visualizations
- [MongoDB Atlas](https://www.mongodb.com/atlas) — Cloud database
