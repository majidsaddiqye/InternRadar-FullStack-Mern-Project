# InternRadar-FullStack-Mern-Project

AI-powered internship recommendation platform built with MERN stack and PostgreSQL.

## 🌟 Features

- **JWT Authentication**: Secure signup, login, and protected routes
- **User Profile Management**: Skills, interests, and experience level tracking
- **GitHub Integration**: Automatic profile scanning and tech stack analysis
- **AI Recommendation Engine**: Smart matching based on skills, interests, and GitHub activity
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Real-time Updates**: Redux state management for seamless user experience

## 🛠️ Tech Stack

### Backend
- Node.js & Express.js
- PostgreSQL with Prisma ORM
- JWT for authentication
- bcryptjs for password hashing
- Axios for GitHub API integration

### Frontend
- React 18
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Recharts for data visualization
- React Icons

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Project-1
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE internradar;
```

2. Configure environment variables:
```bash
cd backend
cp .env.example .env
```

3. Update `.env` file with your database credentials:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/internradar?schema=public"
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
GITHUB_TOKEN=your_github_personal_access_token_here
```

**⚠️ IMPORTANT: GitHub Token Required**

GitHub scanning requires a Personal Access Token. Without it, you'll get 401 errors.

**Quick Setup:**
1. Go to: https://github.com/settings/tokens/new
2. Create token with `public_repo` scope
3. Copy the token (starts with `ghp_`)
4. Add to `.env` file: `GITHUB_TOKEN=ghp_your_token_here`

📖 **Detailed guide**: See `GITHUB_TOKEN_SETUP.md`

4. Run Prisma migrations and seed data:
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

### 4. Run the Application

#### Development Mode (Both servers)
```bash
# From root directory
npm run dev
```

#### Or run separately:

**Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

## 📁 Project Structure

```
Project-1/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Database schema
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js        # Prisma client
│   │   ├── controllers/           # Route controllers
│   │   ├── middleware/            # Auth & validation
│   │   ├── routes/                # API routes
│   │   ├── services/              # Business logic
│   │   ├── utils/                 # Helper functions
│   │   ├── prisma/
│   │   │   └── seed.js            # Database seeding
│   │   └── server.js              # Express app
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/            # Reusable components
│   │   ├── pages/                 # Page components
│   │   ├── store/                 # Redux store & slices
│   │   ├── utils/                 # API client
│   │   ├── App.jsx                # Main app component
│   │   └── main.jsx               # Entry point
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### User Profile
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)
- `PUT /api/users/github-data` - Update GitHub data (Protected)

### GitHub Integration
- `POST /api/github/scan` - Scan GitHub profile (Protected)
- `GET /api/github/profile/:username` - Get GitHub profile data

### Internships
- `GET /api/internships` - Get all internships (with filters)
- `GET /api/internships/:id` - Get single internship
- `GET /api/internships/filters/options` - Get filter options
- `POST /api/internships` - Create internship

### Recommendations
- `GET /api/recommendations` - Get personalized recommendations (Protected)
- `GET /api/recommendations/history` - Get recommendation history (Protected)

## 🎨 Frontend Pages

1. **Landing Page** (`/`) - Hero section with features
2. **Login** (`/login`) - User authentication
3. **Signup** (`/signup`) - User registration
4. **Dashboard** (`/dashboard`) - User overview and quick actions
5. **Profile Editor** (`/profile`) - Edit skills, interests, experience
6. **GitHub Scanner** (`/github`) - Scan and visualize GitHub profile
7. **Recommendations** (`/recommendations`) - View personalized internship matches
8. **Internship Details** (`/internships/:id`) - Detailed internship view

## 🤖 AI Recommendation Engine

The recommendation engine uses a weighted scoring algorithm:

- **Skills Matching (40%)**: Matches user skills with internship tech stack
- **Interests Matching (25%)**: Aligns user interests with internship tags
- **GitHub Tech Stack (25%)**: Analyzes GitHub languages and projects
- **Experience Level (10%)**: Matches experience requirements

Each recommendation includes:
- Match score (0-100%)
- Detailed explanation
- Breakdown of matching criteria

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes
- Input validation with express-validator
- CORS configuration
- Environment variable protection

## 📊 Database Schema

### Users
- id, name, email, password
- skills[], interests[], experience
- githubUsername, githubData (JSON)
- timestamps

### Internships
- id, title, company, description
- tags[], techStack[], location
- stipend, duration, applyLink
- isActive, timestamps

### RecommendationLogs
- id, userId, recommendedInternships (JSON)
- timestamp

## 🧪 Testing

Use the provided Postman collection (`InternRadar.postman_collection.json`) to test all API endpoints.

## 🚧 Development Tips

1. **GitHub API Rate Limits**: Add a GitHub personal access token to `.env` for higher rate limits
2. **Database Reset**: Run `npx prisma migrate reset` to reset database and re-seed
3. **Prisma Studio**: Run `npm run prisma:studio` to view database in browser
4. **Hot Reload**: Both frontend and backend support hot reload in development

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
GITHUB_TOKEN=optional_github_token
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

MIT License

## 👨‍💻 Author

InternRadar - AI-Powered Internship Recommendations

---

**Happy Internship Hunting! 🎯**

