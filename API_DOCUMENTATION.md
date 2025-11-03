# InternRadar API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### 1. Sign Up
**POST** `/auth/signup`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "skills": [],
      "interests": [],
      "experience": "beginner",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

### 2. Login
**POST** `/auth/login`

Authenticate user and get token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { /* user object */ },
    "token": "jwt_token_here"
  }
}
```

### 3. Get Current User
**GET** `/auth/me` 🔒

Get currently authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": { /* user object */ }
  }
}
```

---

## 👤 User Profile Endpoints

### 1. Get Profile
**GET** `/users/profile` 🔒

Get user profile details.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "skills": ["React", "Node.js"],
      "interests": ["web-development"],
      "experience": "intermediate",
      "githubUsername": "johndoe",
      "githubData": { /* github data object */ }
    }
  }
}
```

### 2. Update Profile
**PUT** `/users/profile` 🔒

Update user profile information.

**Request Body:**
```json
{
  "name": "John Doe",
  "skills": ["React", "Node.js", "Python"],
  "interests": ["web-development", "machine-learning"],
  "experience": "intermediate"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": { /* updated user object */ }
  }
}
```

---

## 🐙 GitHub Integration Endpoints

### 1. Scan GitHub Profile
**POST** `/github/scan` 🔒

Scan and analyze a GitHub profile.

**Request Body:**
```json
{
  "username": "octocat"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "GitHub profile scanned successfully",
  "data": {
    "user": { /* updated user with github data */ },
    "githubData": {
      "username": "octocat",
      "name": "The Octocat",
      "bio": "GitHub mascot",
      "publicRepos": 8,
      "followers": 1000,
      "following": 0,
      "totalStars": 500,
      "totalForks": 200,
      "topLanguages": [
        {
          "language": "JavaScript",
          "count": 5,
          "percentage": "62.5"
        }
      ],
      "techStack": ["JavaScript", "Python", "Ruby"],
      "topRepos": [ /* array of top repositories */ ]
    }
  }
}
```

### 2. Get GitHub Profile
**GET** `/github/profile/:username`

Get GitHub profile data (public endpoint).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "githubData": { /* github data object */ }
  }
}
```

---

## 💼 Internship Endpoints

### 1. Get All Internships
**GET** `/internships`

Get list of internships with optional filters.

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `search` (string) - Search in title, company, description
- `tags` (string) - Comma-separated tags
- `techStack` (string) - Comma-separated tech stack
- `location` (string) - Location filter

**Example:**
```
GET /internships?page=1&limit=10&search=developer&tags=remote&techStack=React,Node.js
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "internships": [
      {
        "id": "uuid",
        "title": "Full Stack Developer Intern",
        "company": "TechCorp",
        "description": "...",
        "tags": ["web-development", "remote"],
        "techStack": ["React", "Node.js"],
        "location": "Remote",
        "stipend": "₹15,000/month",
        "duration": "3-6 months",
        "applyLink": "https://...",
        "isActive": true
      }
    ],
    "pagination": {
      "total": 15,
      "page": 1,
      "limit": 10,
      "totalPages": 2
    }
  }
}
```

### 2. Get Internship by ID
**GET** `/internships/:id`

Get single internship details.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "internship": { /* internship object */ }
  }
}
```

### 3. Get Filter Options
**GET** `/internships/filters/options`

Get available filter options (tags, tech stacks, locations).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "tags": ["web-development", "remote", "backend", ...],
    "techStacks": ["React", "Node.js", "Python", ...],
    "locations": ["Remote", "Bangalore", "Mumbai", ...]
  }
}
```

### 4. Create Internship
**POST** `/internships`

Create a new internship posting.

**Request Body:**
```json
{
  "title": "Software Development Intern",
  "company": "Tech Startup",
  "description": "Join our team...",
  "tags": ["software-development", "startup"],
  "techStack": ["JavaScript", "React", "Node.js"],
  "location": "Remote",
  "stipend": "₹20,000/month",
  "duration": "6 months",
  "applyLink": "https://example.com/apply"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Internship created successfully",
  "data": {
    "internship": { /* created internship */ }
  }
}
```

---

## 🎯 Recommendation Endpoints

### 1. Get Recommendations
**GET** `/recommendations` 🔒

Get personalized internship recommendations.

**Query Parameters:**
- `limit` (number, default: 10) - Number of recommendations
- `minScore` (number, default: 0) - Minimum match score (0-100)
- `diverse` (boolean, default: false) - Include diverse results

**Example:**
```
GET /recommendations?limit=10&minScore=50&diverse=true
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "internship": { /* internship object */ },
        "score": 75.5,
        "breakdown": {
          "skillsScore": 30.2,
          "interestsScore": 20.0,
          "githubScore": 18.3,
          "experienceScore": 7.0,
          "matchingSkills": ["React", "Node.js"],
          "matchingInterests": ["web-development"],
          "matchingGithubTech": ["JavaScript"]
        },
        "explanation": "Excellent match! Matches 2 of your skills: React, Node.js. Aligns with your interests in web-development. Your GitHub shows experience with JavaScript."
      }
    ],
    "profileComplete": true,
    "totalFound": 10
  }
}
```

### 2. Get Recommendation History
**GET** `/recommendations/history` 🔒

Get user's recommendation history.

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "uuid",
        "userId": "uuid",
        "recommendedInternships": [ /* array of recommendations */ ],
        "timestamp": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": { /* pagination object */ }
  }
}
```

---

## ❌ Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here",
  "error": "Additional error details"
}
```

### Common Error Codes

- **400 Bad Request** - Invalid input or validation error
- **401 Unauthorized** - Missing or invalid token
- **404 Not Found** - Resource not found
- **429 Too Many Requests** - Rate limit exceeded (GitHub API)
- **500 Internal Server Error** - Server error

### Example Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

---

## 🔑 Authentication Flow

1. **Sign Up**: `POST /auth/signup` → Get token
2. **Login**: `POST /auth/login` → Get token
3. **Store Token**: Save token in localStorage/cookies
4. **Use Token**: Include in Authorization header for protected routes
5. **Verify Token**: `GET /auth/me` to check if token is valid

---

## 📊 Rate Limits

- **GitHub API**: 60 requests/hour (unauthenticated), 5000/hour (with token)
- **Recommendation**: No limit (uses local algorithm)
- **Other endpoints**: No limit

---

## 🧪 Testing with Postman

1. Import `InternRadar.postman_collection.json`
2. Set `baseUrl` variable to `http://localhost:5000/api`
3. Sign up or login to get token
4. Set `token` variable in Postman
5. Test protected endpoints

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- UUIDs are used for all IDs
- Arrays can be empty `[]`
- Optional fields may be `null`
- Passwords are never returned in responses

---

**API Version**: 1.0.0
**Last Updated**: 2024

