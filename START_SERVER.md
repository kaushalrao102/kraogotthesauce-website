# ✅ Node.js Updated - Server Ready!

## What Was Done

1. ✅ **Node.js 20.19.6 installed** via Homebrew
2. ✅ **PATH updated** in `~/.zshrc` (will persist after terminal restart)
3. ✅ **Dependencies reinstalled** with new Node version
4. ✅ **Port changed to 3000** (as requested)

## How to Start the Server

### Option 1: Current Terminal Session

Since we updated PATH in this session, you can run:

```bash
cd /Users/kaushalrao/Desktop/krao-website
npm run dev
```

### Option 2: New Terminal Session

If you open a new terminal, the PATH is already updated in `~/.zshrc`, so just run:

```bash
cd /Users/kaushalrao/Desktop/krao-website
npm run dev
```

### Option 3: If PATH Not Working

If for some reason the PATH isn't working in a new terminal, run:

```bash
export PATH="/usr/local/opt/node@20/bin:$PATH"
cd /Users/kaushalrao/Desktop/krao-website
npm run dev
```

## Access Your Website

Once the server starts, you'll see:

```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

**Open in browser:** http://localhost:3000

## Verify Node Version

To check that Node.js 20 is active:

```bash
node --version  # Should show: v20.19.6
npm --version   # Should show: 10.8.2 or higher
```

## Troubleshooting

**If you see "command not found: node":**
- Run: `export PATH="/usr/local/opt/node@20/bin:$PATH"`
- Or restart your terminal

**If port 3000 is in use:**
- The server will automatically try the next available port
- Check the terminal output for the actual port number

**If dependencies are missing:**
- Run: `npm install` again

---

**Everything is ready! Just run `npm run dev` to start testing your website!** 🚀
