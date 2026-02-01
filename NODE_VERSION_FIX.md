# Node.js Version Issue - Fix Required

## Problem
Your current Node.js version is **v12.7.0**, but Vite requires **Node.js 18 or higher**.

## Solution Options

### Option 1: Use NVM (Node Version Manager) - Recommended

If you have `nvm` installed:

```bash
# Check available versions
nvm list

# Install Node.js 20 (LTS)
nvm install 20

# Use Node.js 20
nvm use 20

# Verify version
node --version  # Should show v20.x.x

# Now try running the dev server
npm run dev
```

### Option 2: Install/Update Node.js Directly

1. **Download Node.js 20 LTS** from: https://nodejs.org/
2. Install it (this will replace your old version)
3. Verify: `node --version` should show v20.x.x
4. Run: `npm run dev`

### Option 3: Use Homebrew (Mac)

```bash
# Install/update Node.js via Homebrew
brew install node@20

# Or if you have it already
brew upgrade node
```

### Option 4: Use a Different Node Manager

If you're using `n` (another Node version manager):

```bash
n 20
```

## After Updating Node.js

1. **Reinstall dependencies** (recommended):
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Start the dev server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   ```
   http://localhost:3000
   ```
   (Port changed from 8080 to 3000 as requested)

## Verify Your Setup

Run these commands to check:

```bash
node --version  # Should be v18.x.x or v20.x.x
npm --version   # Should be v9.x.x or higher
```

## Why This Happened

- Node.js v12.7.0 was released in 2019 and is no longer supported
- Modern tools like Vite use ES modules and newer JavaScript features
- Node.js 18+ is required for Vite 5.x

## Need Help?

If you're having trouble updating Node.js:
1. Check if you have `nvm` installed: `which nvm` or `nvm --version`
2. If not, install nvm: https://github.com/nvm-sh/nvm
3. Or download directly from nodejs.org

---

**Once Node.js is updated to v18+, the dev server will work!**
