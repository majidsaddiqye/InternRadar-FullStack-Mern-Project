# InternRadar - Quick Start (5 Minutes)

## Prerequisites
- Node.js installed
- PostgreSQL installed and running

## Setup in 5 Steps

### Step 1: Create Database (30 seconds)
```bash
# Open PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE internradar;

# Exit
\q
```

### Step 2: Configure Backend (1 minute)
```bash
cd backend
npm install
cp .env.example .env
```

**Edit `backend/.env`:**
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/internradar?schema=public"
JWT_SECRET=my_super_secret_key_12345
GITHUB_TOKEN=ghp_YOUR_GITHUB_TOKEN_HERE
```
Replace:
- `YOUR_PASSWORD` with your PostgreSQL password
- `ghp_YOUR_GITHUB_TOKEN_HERE` with your GitHub token

**🔑 Get GitHub Token (Required for GitHub Scanner):**
1. Visit: https://github.com/settings/tokens/new
2. Create token with `public_repo` scope
3. Copy and paste in `.env` file

See `GITHUB_TOKEN_SETUP.md` for detailed instructions.

### Step 3: Setup Database (1 minute)
```bash
# Still in backend directory
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

### Step 4: Install Frontend (1 minute)
```bash
cd ../frontend
npm install
```

### Step 5: Run Application (30 seconds)
```bash
# From root directory
cd ..
npm install
npm run dev
```

## Access the App

🌐 **Frontend**: http://localhost:5173
🔌 **Backend**: http://localhost:5000/api

## First Steps

1. **Sign Up**: Create a new account
2. **Add Skills**: Go to Profile → Add skills like "React", "Node.js", "Python"
3. **Add Interests**: Add interests like "web-development", "backend"
4. **Get Recommendations**: Click "Recommendations" to see personalized matches!

## Optional: Connect GitHub

1. Go to "GitHub Scanner"
2. Enter your GitHub username
3. Click "Scan Profile"
4. View your tech stack analysis
5. Get better recommendations!

## Test Credentials (After Signup)

You can create any account. Example:
- Email: `test@example.com`
- Password: `password123`

## Sample Skills to Add

**Frontend**: React, Vue, Angular, JavaScript, TypeScript, HTML, CSS, Tailwind

**Backend**: Node.js, Python, Django, Flask, Java, Spring Boot, PHP

**Database**: MongoDB, PostgreSQL, MySQL, Redis

**Other**: Git, Docker, AWS, Machine Learning, Data Science

## Sample Interests

- web-development
- mobile-development
- machine-learning
- data-science
- backend
- frontend
- full-stack
- devops
- ui-ux
- cybersecurity

## Troubleshooting

**Database connection error?**
```bash
# Make sure PostgreSQL is running
# Windows: Check Services
# Linux: sudo service postgresql start
# Mac: brew services start postgresql
```

**Port already in use?**
```bash
# Change PORT in backend/.env to 5001
# Update frontend proxy in vite.config.js
```

**Need to reset database?**
```bash
cd backend
npx prisma migrate reset
npm run prisma:seed
```

## What's Included

✅ 15 pre-seeded internships
✅ Full authentication system
✅ AI recommendation engine
✅ GitHub profile scanner
✅ Beautiful responsive UI
✅ Complete API with Postman collection

## Next Steps

- Complete your profile
- Scan your GitHub profile
- Explore recommendations
- View internship details
- Check out the code!

## Need Help?

- Read `README.md` for detailed documentation
- Check `SETUP_GUIDE.md` for troubleshooting
- Review `PROJECT_OVERVIEW.md` for architecture details
- Import `InternRadar.postman_collection.json` to test APIs

---

**You're all set! Happy internship hunting! 🎯**

