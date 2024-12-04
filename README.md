# QR Code Redirect System

A system for managing QR code redirects with a React frontend and Express backend.

## Features

- QR code generation and management
- User authentication
- Admin dashboard
- URL redirection handling
- Secure JWT-based authentication

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```env
PORT=3000
CORS_ORIGIN=your-frontend-url
JWT_SECRET=your-secret-key
```

3. Start the development server:
```bash
npm run dev
```

4. For production:
```bash
npm run build
npm start
```

## Deployment

This project is configured for deployment on Railway:

1. Connect your GitHub repository to Railway
2. Railway will automatically detect the configuration
3. The build and start commands are configured in `railway.toml`
4. Environment variables should be set in Railway's dashboard

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Express.js
- Database: LowDB
- Styling: Tailwind CSS
- Authentication: JWT