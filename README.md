# o

Backend API for o

## Tech Stack

- **Frontend**: React
- **Backend**: FastAPI + SQLAlchemy
- **Frontend Source**: GitHub ([Repository](https://github.com/HimaShankarReddyEguturi/Designecommerceproductui.git))

## Project Structure

```
o/
├── frontend/          # Frontend application
├── backend/           # Backend API
├── README.md          # This file
└── docker-compose.yml # Docker configuration (if applicable)
```

## Getting Started

### Prerequisites

- Node.js 18+ (for frontend)
- Python 3.11+ (for Python backends)
- Docker (optional, for containerized setup)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
# Follow backend-specific setup instructions in backend/README.md
```

## Features

- user management
- authentication
- authorization

## API Endpoints

- `POST /api/register` - Create a new user account
- `POST /api/login` - Log in to an existing user account
- `POST /api/reset-password` - Reset a user's password
- `GET /api/profile` - Retrieve a user's profile information
- `PUT /api/profile` - Update a user's profile information

## License

MIT
