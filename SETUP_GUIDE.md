# InternRadar - Quick Setup Guide

## Step-by-Step Installation

### 1. Prerequisites Check

Make sure you have installed:
- ✅ Node.js (v16+): `node --version`
- ✅ PostgreSQL (v12+): `psql --version`
- ✅ npm or yarn: `npm --version`

### 2. Database Setup

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE internradar;

# Exit PostgreSQL
\q
```

### 3. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
# Update DATABASE_URL with your PostgreSQL credentials
# Example: postgresql://postgres:password@localhost:5432/internradar?schema=public

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database with sample internships
npm run prisma:seed
```

### 4. Frontend Setup

```bash
# Navigate to frontend (from root)
cd frontend

# Install dependencies
npm install
```

### 5. Run the Application

#### Option 1: Run both servers together (Recommended)
```bash
# From root directory
npm install
npm run dev
```

#### Option 2: Run separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

### 7. Test the Application

1. **Create an account**: Go to http://localhost:5173/signup
2. **Login**: Use your credentials
3. **Complete profile**: Add skills and interests
4. **Scan GitHub**: (Optional) Add your GitHub username
5. **Get recommendations**: View personalized internship matches

## Common Issues & Solutions

### Issue 1: Database Connection Error
```
Error: Can't reach database server
```
**Solution:**
- Make sure PostgreSQL is running: `sudo service postgresql start` (Linux) or check Services (Windows)
- Verify DATABASE_URL in `.env` file
- Check PostgreSQL credentials

### Issue 2: Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution:**
- Change PORT in `backend/.env` to another port (e.g., 5001)
- Update VITE_API_URL in `frontend/.env` accordingly

### Issue 3: Prisma Migration Fails
```
Error: Migration failed
```
**Solution:**
```bash
cd backend
npx prisma migrate reset
npx prisma migrate dev --name init
npm run prisma:seed
```

### Issue 4: GitHub API Rate Limit
```
Error: GitHub API rate limit exceeded
```
**Solution:**
- Create a GitHub Personal Access Token:
  1. Go to GitHub Settings → Developer settings → Personal access tokens
  2. Generate new token (classic)
  3. Select `public_repo` scope
  4. Copy token and add to `backend/.env`: `GITHUB_TOKEN=your_token_here`

## Environment Variables Reference

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database (Update with your credentials)
DATABASE_URL="postgresql://postgres:password@localhost:5432/internradar?schema=public"

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# GitHub (Optional - for higher rate limits)
GITHUB_TOKEN=your_github_personal_access_token

# CORS
CLIENT_URL=http://localhost:5173
```

### Frontend (.env) - Optional
```env
VITE_API_URL=http://localhost:5000/api
```

## Useful Commands

### Backend
```bash
# Start development server
npm run dev

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Open Prisma Studio (Database GUI)
npm run prisma:studio

# Reset database
npx prisma migrate reset
```

### Frontend
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing with Postman

1. Import `InternRadar.postman_collection.json` into Postman
2. Set the `baseUrl` variable to `http://localhost:5000/api`
3. Test endpoints in this order:
   - Signup → Login → Copy token
   - Set `token` variable in Postman
   - Test protected routes (Profile, GitHub, Recommendations)

## Default Seeded Data

The database is seeded with 15 sample internships covering:
- Full Stack Development
- Frontend Development
- Backend Development
- Machine Learning
- DevOps
- Mobile Development
- Data Science
- UI/UX Design
- Cybersecurity
- Blockchain
- And more...

## Next Steps

1. ✅ Complete your profile with skills and interests
2. ✅ Connect your GitHub profile for better recommendations
3. ✅ Explore personalized internship recommendations
4. ✅ View detailed internship information
5. ✅ Apply to internships that match your profile

## Support

If you encounter any issues:
1. Check this guide for common solutions
2. Verify all environment variables are set correctly
3. Ensure PostgreSQL is running
4. Check console logs for detailed error messages

---

**Happy Coding! 🚀**

