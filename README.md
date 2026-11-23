
# HOODVERSE – Streetwear Store

## About the Project

HOODVERSE is a modern online streetwear shopping website developed as a college project at Geeta University.

It provides a user-friendly shopping experience where customers can explore streetwear products, add items to their cart, manage quantities and proceed to checkout through WhatsApp.

The project uses React and TypeScript for the frontend and Node.js with Express.js for the backend.

## Live Website

- Frontend: https://hoodverse-store.vercel.app/
- Backend: https://hoodverse-backend.onrender.com/
- Backend Health Check: https://hoodverse-backend.onrender.com/api/health

## Features

- Modern and responsive shopping interface.
- Homepage with product images.
- Shop and About Us sections.
- Add products to the shopping cart.
- Increase and decrease product quantities.
- Remove products from the cart.
- Automatic cart item count updates.
- WhatsApp checkout with product names, quantities and total price.
- Contact form connected to the backend API.
- Success confirmation after contact form submission.

## Technologies Used

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS 4

### Backend
- Node.js
- Express.js

### Tools and Deployment
- Git and GitHub
- Vercel
- Render

## Project Structure

- `src/` – Frontend source code.
- `public/` – Public assets and resources.
- `backend/` – Backend application code.
- `index.html` – Main HTML entry point.
- `package.json` – Project dependencies and scripts.
- `README.md` – Project documentation.

## Installation and Setup

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/hoodapari02-ai/HOODVERSEStreetwearStore.git
```

### 2. Open the Project Folder

```bash
cd HOODVERSEStreetwearStore
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure the Backend URL

Create a `.env` file in the project root and add:

```env
VITE_API_URL=http://localhost:5000
```

### 5. Start the Backend

```bash
node backend/server.cjs
```

The backend will run on port 5000 by default.

### 6. Start the Frontend

Open a separate terminal in the project folder and run:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Backend welcome message |
| GET | `/api/health` | Health check |
| GET | `/api/store` | Store information |
| POST | `/api/contact` | Contact form submission |
| POST | `/api/orders` | Order submission |

## Deployment

The project is deployed using:

- **Vercel:** Hosts the frontend.
- **Render:** Hosts the backend.

The frontend communicates with the deployed backend using the `VITE_API_URL` environment variable.

## Contact Form

The contact form sends information to the backend API and displays a success confirmation after a successful response.

Note: The current backend returns a success confirmation but does not permanently store or email submitted messages.

## Project Purpose

This project demonstrates practical knowledge of frontend development, backend development, API integration, version control and cloud deployment.

Developed as part of the academic assessment at Geeta University.

---

**Project Name:** HOODVERSE – Streetwear Store

**GitHub Repository:** https://github.com/hoodapari02-ai/HOODVERSEStreetwearStore
