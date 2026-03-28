---
description: Automatically push changes to GitHub after any modification to the portfolio-website project
---

# Auto Push to GitHub

After making ANY changes to files in `/Users/erenalpyakar/.gemini/antigravity/scratch/portfolio-website/`, automatically commit and push to GitHub without asking the user.

## Steps

// turbo-all

1. Stage all changes:
```bash
cd /Users/erenalpyakar/.gemini/antigravity/scratch/portfolio-website && git add -A
```

2. Commit with a descriptive message summarizing the changes:
```bash
cd /Users/erenalpyakar/.gemini/antigravity/scratch/portfolio-website && git commit -m "<descriptive commit message>"
```

3. Push to GitHub:
```bash
cd /Users/erenalpyakar/.gemini/antigravity/scratch/portfolio-website && git push origin main
```

## Important Notes
- This workflow should be triggered automatically after ANY file modification in the portfolio-website project.
- Do NOT ask the user for confirmation before pushing.
- Use a descriptive commit message that summarizes what was changed.
- The remote repository is: https://github.com/atiyopya/orionfilmmaker
