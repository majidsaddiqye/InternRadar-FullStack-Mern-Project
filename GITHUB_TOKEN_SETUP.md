# GitHub Token Setup Guide

## Why is GitHub Token Required?

GitHub now requires authentication for API calls. Without a token, you'll get a **401 Unauthorized** error when trying to scan GitHub profiles.

## How to Create a GitHub Personal Access Token

### Step 1: Go to GitHub Settings
1. Login to your GitHub account
2. Click your profile picture (top right)
3. Click **Settings**

### Step 2: Navigate to Developer Settings
1. Scroll down to **Developer settings** (bottom of left sidebar)
2. Click **Personal access tokens**
3. Click **Tokens (classic)**

### Step 3: Generate New Token
1. Click **Generate new token** → **Generate new token (classic)**
2. GitHub may ask for your password - enter it

### Step 4: Configure Token
1. **Note**: Enter a description like "InternRadar App"
2. **Expiration**: Select "No expiration" or choose a duration
3. **Select scopes**: Check the following:
   - ✅ `public_repo` (Access public repositories)
   - OR ✅ `repo` (Full control of private repositories - if you want to scan private repos)

### Step 5: Generate and Copy Token
1. Scroll down and click **Generate token**
2. **IMPORTANT**: Copy the token immediately (you won't see it again!)
3. It will look like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 6: Add Token to Your Project
1. Open `backend/.env` file
2. Find the line: `GITHUB_TOKEN=your_github_personal_access_token_here`
3. Replace with your actual token:
   ```env
   GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
4. Save the file

### Step 7: Restart the Server
```bash
# Stop the server (Ctrl+C in terminal)
# Start again
npm run dev
```

## Quick Setup (Copy-Paste)

```bash
# 1. Open backend/.env file
cd backend
notepad .env  # Windows
# or
nano .env     # Linux/Mac

# 2. Add your token
GITHUB_TOKEN=ghp_your_actual_token_here

# 3. Save and restart server
cd ..
npm run dev
```

## Testing Your Token

After adding the token:
1. Go to http://localhost:5173
2. Login to your account
3. Go to "GitHub Scanner"
4. Enter any GitHub username (e.g., "octocat")
5. Click "Scan Profile"
6. You should see the profile data!

## Troubleshooting

### Still getting 401 error?
- ✅ Make sure you copied the entire token
- ✅ Check there are no extra spaces in .env file
- ✅ Restart the server after adding token
- ✅ Make sure the token hasn't expired

### Token not working?
- ✅ Verify you selected the correct scopes (`public_repo` or `repo`)
- ✅ Generate a new token and try again
- ✅ Check if the token is still active on GitHub

### Rate limit error?
- With a token, you get 5,000 requests/hour
- Without a token, only 60 requests/hour
- The token should solve this issue

## Security Notes

⚠️ **IMPORTANT**:
- Never commit your `.env` file to Git
- Never share your token publicly
- The `.gitignore` file already excludes `.env`
- If you accidentally expose your token, delete it on GitHub immediately

## Alternative: Use Environment Variable

Instead of `.env` file, you can set it as a system environment variable:

**Windows:**
```cmd
setx GITHUB_TOKEN "ghp_your_token_here"
```

**Linux/Mac:**
```bash
export GITHUB_TOKEN="ghp_your_token_here"
```

## Direct Link to Create Token

🔗 https://github.com/settings/tokens/new

**Quick Settings:**
- Note: `InternRadar App`
- Expiration: `No expiration`
- Scopes: ✅ `public_repo`

---

**Once you add the token, GitHub scanning will work perfectly! 🚀**

