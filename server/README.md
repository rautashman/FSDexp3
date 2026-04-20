# React Mart Backend

## Setup

1. Install backend dependencies:
   npm install
2. Create environment file:
   cp .env.example .env
3. Update `MONGO_URI` in `.env`.
4. Start backend server:
   npm run dev

The API runs on `http://localhost:5000` by default.

## API Endpoints

- `GET /api/health` - backend health check
- `POST /api/orders` - saves checkout form data to MongoDB
