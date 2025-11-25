# HB Suites Website - Complete Maintenance Guide

This comprehensive guide provides detailed instructions for maintaining the HB Suites website, including updating suite availability, managing form submissions, deploying updates, and troubleshooting common issues.

---

## Table of Contents

1. [Updating Suite Status](#updating-suite-status)
2. [Managing Form Submissions](#managing-form-submissions)
3. [Deploying Updates](#deploying-updates)
4. [Local Development Setup](#local-development-setup)
5. [Git Workflow Best Practices](#git-workflow-best-practices)
6. [Troubleshooting Common Issues](#troubleshooting-common-issues)
7. [Backup and Recovery](#backup-and-recovery)
8. [Technical Architecture Overview](#technical-architecture-overview)

---

## Updating Suite Status

The availability of salon suites is managed through a simple JSON file. This allows for quick updates without needing to modify the website's code or understand programming.

### Step 1: Locate the Data File

The suite status information is stored in:

**File Path:** `public/suite-status.json`

This file is located in the `public` folder at the root of the project directory.

### Step 2: Understanding the File Structure

Open `suite-status.json` in any text editor (Notepad, VS Code, Sublime Text, etc.). The file contains a JSON object with a `suites` array:

```json
{
  "suites": [
    { "id": "1", "status": "leased" },
    { "id": "2", "status": "leased" },
    { "id": "3", "status": "leased" },
    { "id": "11", "status": "available" },
    { "id": "26", "status": "available" },
    { "id": "32", "status": "available" }
  ]
}
```

**Structure Explanation:**

- **`suites`**: An array containing all suite objects
- **`id`**: The unique suite number (must be a string in quotes)
- **`status`**: The availability status, can only be `"available"` or `"leased"`

### Step 3: Edit Suite Status

To change a suite's status:

1. **Find the suite** by locating its `id` in the list
2. **Modify the status** value:
   - `"available"` - Suite is available for lease
   - `"leased"` - Suite is currently leased

**Example 1: Mark Suite 11 as Leased**

Change from:

```json
{ "id": "11", "status": "available" }
```

To:

```json
{ "id": "11", "status": "leased" }
```

**Example 2: Mark Suite 26 as Available**

Change from:

```json
{ "id": "26", "status": "leased" }
```

To:

```json
{ "id": "26", "status": "available" }
```

**Example 3: Update Multiple Suites**

You can update multiple suites in one edit session:

```json
{
  "suites": [
    { "id": "1", "status": "leased" },
    { "id": "11", "status": "leased" }, // Changed from available
    { "id": "15", "status": "available" }, // Changed from leased
    { "id": "26", "status": "available" },
    { "id": "32", "status": "leased" } // Changed from available
  ]
}
```

### Step 4: Validate Your Changes

**Important Validation Checks:**

1. **Check JSON Syntax:**

   - Every `{` has a matching `}`
   - Every `[` has a matching `]`
   - All strings are in double quotes `""`
   - Each suite object ends with a comma `,` EXCEPT the last one
   - No trailing commas after the last item

2. **Use a JSON Validator:**

   - Visit [JSONLint.com](https://jsonlint.com/)
   - Copy and paste your entire file content
   - Click "Validate JSON"
   - Fix any errors shown

3. **Common Mistakes to Avoid:**

   ```json
   // ❌ WRONG - Missing comma
   { "id": "1", "status": "leased" }
   { "id": "2", "status": "leased" }

   // ✅ CORRECT - Comma added
   { "id": "1", "status": "leased" },
   { "id": "2", "status": "leased" }

   // ❌ WRONG - Trailing comma on last item
   { "id": "38", "status": "leased" },

   // ✅ CORRECT - No comma on last item
   { "id": "38", "status": "leased" }

   // ❌ WRONG - Invalid status value
   { "id": "11", "status": "pending" }

   // ✅ CORRECT - Only "available" or "leased"
   { "id": "11", "status": "available" }
   ```

### Step 5: Save and Deploy

1. **Save the file** in your text editor
2. **Follow the [Deploying Updates](#deploying-updates) section** to push changes live
3. **Verify the changes** on the live website after deployment

### Quick Reference: Suite Numbers

The HB Suites property has **38 total suites** numbered from 1 to 38. Each suite ID must exist in the JSON file.

---

## Managing Form Submissions

The website uses Netlify Forms to handle all contact form submissions. This service automatically captures, stores, and manages form data without requiring a backend server.

### Understanding Netlify Forms

**How It Works:**

1. Visitors fill out the contact form on the website
2. Form data is submitted to Netlify
3. Submissions are stored securely in your Netlify dashboard
4. You can receive email notifications for new submissions
5. Data can be exported, filtered, and managed through the dashboard

### Accessing Form Submissions

**Step-by-Step Instructions:**

1. **Log in to Netlify:**

   - Go to [https://app.netlify.com/](https://app.netlify.com/)
   - Sign in with your Netlify account credentials

2. **Navigate to Your Site:**

   - Click on the "HB Suites" site from your sites list
   - You'll see the site overview dashboard

3. **Access the Forms Section:**

   - In the top navigation menu, click **"Forms"**
   - You'll see a list of all forms on your site
   - Click on "contact" form to view submissions

4. **View Submissions:**
   - Each submission shows:
     - **Date and time** submitted
     - **Name** of the person
     - **Email** address
     - **Phone** number
     - **Message** content
     - **Interested Suite** number (if provided)
   - Click on any submission to view full details

### Setting Up Email Notifications

**Receive instant notifications when someone submits the form:**

1. **Go to Form Settings:**

   - In the Forms section, click on the "contact" form
   - Click on **"Settings & Usage"** tab

2. **Add Form Notifications:**

   - Scroll to **"Form notifications"**
   - Click **"Add notification"**
   - Select **"Email notification"**

3. **Configure Email Settings:**

   - **Email to notify:** Enter your email address (e.g., manager@hbsuites.com)
   - **Event to trigger:** Select "New form submission"
   - **Subject line:** Customize (e.g., "New HB Suites Inquiry")
   - Click **"Save"**

4. **Multiple Recipients:**
   - To send to multiple people, click "Add notification" again
   - Enter a different email address
   - Repeat for each person who should receive notifications

### Exporting Form Data

**Export submissions for record-keeping or analysis:**

1. **Navigate to Forms:**

   - Go to Netlify dashboard → Your site → Forms
   - Click on "contact" form

2. **Export Options:**

   - Click the **"Export"** button (top right)
   - Choose format:
     - **CSV** - Compatible with Excel, Google Sheets
     - **JSON** - For technical/programmatic use

3. **Filter Before Exporting:**

   - Use date range picker to export specific periods
   - Example: "Last 30 days", "Last quarter", "Custom range"

4. **What's Included:**
   - All form fields (name, email, phone, message, suite)
   - Submission timestamp
   - User's IP address (for spam detection)
   - Form name

### Managing Spam Submissions

Netlify includes built-in spam filtering using Akismet.

**Spam Settings:**

1. **Enable Spam Filtering:**

   - Forms section → Settings
   - Toggle **"Spam filtering"** to ON
   - Netlify will automatically filter suspicious submissions

2. **Review Spam:**

   - In Forms section, switch from **"Verified"** to **"Spam"** tab
   - Review flagged submissions
   - Mark false positives as "Not Spam"

3. **Block Specific Submissions:**
   - Open a spam submission
   - Click **"Block this email"** or **"Block this IP"**
   - Future submissions from that source will be blocked

### Responding to Inquiries

**Best Practices:**

1. **Check forms daily** for new submissions
2. **Respond within 24 hours** to maintain good customer service
3. **Keep a record** of all correspondence
4. **Update suite status** immediately when a suite is leased
5. **Archive exported data** monthly for records

### Form Data Privacy

**Important Notes:**

- Form submissions are stored securely on Netlify's servers
- Data is encrypted in transit (HTTPS)
- Only authorized Netlify account users can access submissions
- Export and delete old data periodically per privacy regulations
- Never share form submission data with unauthorized parties

---

## Deploying Updates

The website is hosted on Netlify with automated deployments through GitHub. Every change pushed to the main branch triggers a new build and deployment.

### Prerequisites

**Before deploying, ensure you have:**

1. **Git installed** on your computer

   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation: Open terminal/command prompt and type `git --version`

2. **GitHub account access**

   - You should have access to the HB Suites repository
   - Repository: `CREHoldings/HB-Suites`

3. **Git configured with your credentials**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

### Standard Deployment Process

**Step 1: Make Your Changes**

Edit the necessary files (e.g., `public/suite-status.json`)

**Step 2: Check What Changed**

Open terminal/command prompt in the project folder and run:

```bash
git status
```

This shows all modified files. You should see something like:

```
Changes not staged for commit:
  modified:   public/suite-status.json
```

**Step 3: Review Your Changes**

To see exactly what changed:

```bash
git diff public/suite-status.json
```

Lines in **green** (with `+`) are additions, **red** (with `-`) are deletions.

**Step 4: Stage Your Changes**

Add the files you want to deploy:

```bash
# Add a specific file
git add public/suite-status.json

# Or add all changed files
git add .
```

**Step 5: Commit Your Changes**

Create a commit with a descriptive message:

```bash
git commit -m "Update suite 11 and 26 to leased status"
```

**Good commit message examples:**

- ✅ `"Update suites 11, 15, 26 to available"`
- ✅ `"Mark suite 32 as leased"`
- ✅ `"Update multiple suite statuses for December"`
- ❌ `"update"` (too vague)
- ❌ `"changes"` (not descriptive)

**Step 6: Push to GitHub**

Upload your changes to GitHub:

```bash
git push origin main
```

You may be prompted to enter your GitHub credentials.

**Step 7: Automatic Build on Netlify**

- Netlify detects the push to GitHub automatically
- A new build starts within seconds
- Build typically takes 1-3 minutes

**Step 8: Monitor Deployment**

1. **Go to Netlify Dashboard:**

   - Visit [https://app.netlify.com/](https://app.netlify.com/)
   - Click on HB Suites site

2. **Check Deploys Tab:**

   - Click **"Deploys"** in the top navigation
   - You'll see the deployment in progress
   - Status shows: "Building" → "Deploying" → "Published"

3. **View Build Log:**
   - Click on the deployment
   - View real-time build logs
   - Check for any errors or warnings

**Step 9: Verify Live Changes**

1. **Visit the live website:**

   - URL: Your production URL (e.g., `https://hbsuites.netlify.app`)
   - Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

2. **Check the changes:**
   - For suite updates: Navigate to "Available Suites" section
   - Verify the correct suites show as available/leased

### Deployment Troubleshooting

**Build Failed?**

1. **Check Build Logs:**

   - Netlify dashboard → Deploys → Click failed deploy
   - Read error messages at the bottom of the log

2. **Common Build Errors:**

   **JSON Syntax Error:**

   ```
   Error: Unexpected token in JSON
   ```

   **Solution:** Validate JSON at [JSONLint.com](https://jsonlint.com/), fix syntax errors

   **Dependency Error:**

   ```
   Error: Cannot find module 'xyz'
   ```

   **Solution:** Contact developer, may need package updates

3. **Rollback to Previous Version:**
   - Deploys tab → Find last successful deploy
   - Click **"..."** menu → **"Publish deploy"**
   - Site reverts to previous working version immediately

**Deployment Stuck?**

- Wait 10 minutes (some builds take time)
- Check Netlify status page: [netlifystatus.com](https://www.netlifystatus.com/)
- If stuck over 15 minutes, trigger manual deploy:
  - Deploys tab → **"Trigger deploy"** → **"Deploy site"**

**Changes Not Showing?**

1. **Clear browser cache:**

   - Chrome: `Ctrl + Shift + Delete` → Clear cached images and files
   - Or use incognito/private browsing mode

2. **Check if deploy completed:**

   - Ensure deploy shows "Published" status
   - Wait 1-2 minutes for CDN propagation

3. **Verify correct file was changed:**
   - Check deploy details → **"Deploy Log"**
   - Confirm your changes are included

### Manual Deployment (Alternative Method)

**If Git is not available, you can deploy through Netlify's drag-and-drop:**

1. **Build the site locally** (requires Node.js):

   ```bash
   npm install
   npm run build
   ```

2. **Deploy via Netlify:**
   - Go to Netlify dashboard → Deploys
   - Scroll to "Need to deploy manually?"
   - Drag the `dist` folder onto the upload area
   - Site deploys immediately

**Note:** This method is not recommended for regular use. Use Git workflow for version control.

---

## Local Development Setup

Test changes locally before deploying to production.

### Prerequisites

**Install Required Software:**

1. **Node.js** (JavaScript runtime)

   - Download from [nodejs.org](https://nodejs.org/)
   - Recommended: LTS (Long Term Support) version
   - Verify installation: `node --version` (should show v18 or higher)

2. **Git** (version control)

   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation: `git --version`

3. **Code Editor** (optional but recommended)
   - VS Code: [code.visualstudio.com](https://code.visualstudio.com/)
   - Or any text editor you prefer

### Setup Steps

**1. Clone the Repository**

```bash
# Navigate to where you want the project
cd Desktop/Projects

# Clone the repository
git clone https://github.com/CREHoldings/HB-Suites.git

# Enter the project folder
cd HB-Suites
```

**2. Install Dependencies**

```bash
npm install
```

This downloads all required packages (may take 2-5 minutes).

**3. Start Development Server**

```bash
npm run dev
```

Expected output:

```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**4. Open in Browser**

- Visit `http://localhost:5173/` in your browser
- The site loads with live reload enabled
- Any changes to files automatically refresh the browser

### Testing Changes Locally

**Example: Test Suite Status Update**

1. **Edit the file:**

   - Open `public/suite-status.json`
   - Change a suite status
   - Save the file

2. **View changes:**

   - Browser automatically refreshes
   - Navigate to "Available Suites" section
   - Verify the suite shows correct status

3. **If satisfied:**
   - Follow [Deploying Updates](#deploying-updates) to push live
   - If not, revert changes and try again

### Stopping the Development Server

- Press `Ctrl + C` in the terminal
- Or close the terminal window

### Local Development Tips

**Best Practices:**

1. **Always test locally first** before deploying
2. **Keep dev server running** while making changes
3. **Check browser console** (F12) for errors
4. **Use incognito mode** to avoid cache issues
5. **Test on different screen sizes** (mobile, tablet, desktop)

---

## Git Workflow Best Practices

Proper Git usage ensures you can track changes, collaborate safely, and revert mistakes.

### Basic Git Commands Reference

```bash
# Check current status
git status

# See what changed
git diff

# See commit history
git log --oneline

# Add files to staging
git add filename.json
git add .  # adds all changes

# Commit changes
git commit -m "Descriptive message"

# Push to GitHub
git push origin main

# Pull latest changes from GitHub
git pull origin main

# Discard local changes (careful!)
git checkout -- filename.json
```

### Recommended Workflow

**For Suite Status Updates:**

1. **Pull latest version** before making changes:

   ```bash
   git pull origin main
   ```

2. **Make your changes** to `suite-status.json`

3. **Test locally** (if setup):

   ```bash
   npm run dev
   ```

4. **Stage and commit:**

   ```bash
   git add public/suite-status.json
   git commit -m "Update suite 26 to available"
   ```

5. **Push to deploy:**
   ```bash
   git push origin main
   ```

### Handling Conflicts

**If you see "merge conflict" error:**

1. **Don't panic** - this means someone else changed the same file

2. **Open the conflicting file**

   - Look for conflict markers:

   ```
   <<<<<<< HEAD
   { "id": "11", "status": "available" }
   =======
   { "id": "11", "status": "leased" }
   >>>>>>> main
   ```

3. **Resolve the conflict:**

   - Decide which version is correct
   - Delete the conflict markers
   - Keep only the correct version

4. **Complete the merge:**
   ```bash
   git add public/suite-status.json
   git commit -m "Resolve merge conflict for suite 11"
   git push origin main
   ```

### Undoing Changes

**Before committing:**

```bash
# Discard all local changes
git checkout -- public/suite-status.json
```

**After committing but before pushing:**

```bash
# Undo last commit, keep changes
git reset HEAD~1

# Undo last commit, discard changes
git reset --hard HEAD~1
```

**After pushing (revert on Netlify):**

- Use Netlify dashboard to publish a previous deploy
- Or create a new commit that reverses the change

### Creating Backups Before Major Changes

```bash
# Create a backup branch
git checkout -b backup-before-major-update
git push origin backup-before-major-update

# Return to main branch
git checkout main

# Make your changes on main
# If something goes wrong, you can restore from backup branch
```

---

## Troubleshooting Common Issues

### Issue: Suite Status Not Updating on Website

**Possible Causes:**

1. **Browser Cache**

   - **Solution:** Hard refresh (`Ctrl + Shift + R` or `Cmd + Shift + R`)
   - Or clear browser cache completely

2. **JSON File Not Saved**

   - **Solution:** Re-open file, verify changes are present, save again

3. **Deploy Failed**

   - **Solution:** Check Netlify deploy logs for errors

4. **Wrong File Edited**

   - **Solution:** Verify you edited `public/suite-status.json` (not a backup)

5. **Changes Not Committed/Pushed**
   - **Solution:** Run `git status` to check if changes were pushed

### Issue: Form Submissions Not Appearing

**Possible Causes:**

1. **Looking in Wrong Place**

   - **Solution:** Ensure you're in correct Netlify site → Forms section

2. **Spam Filter Caught It**

   - **Solution:** Check "Spam" tab in Forms section

3. **Form Not Configured Properly**

   - **Solution:** Check if `netlify` attribute exists in form (requires developer)

4. **Network Issue During Submission**
   - **Solution:** Ask visitor to resubmit

### Issue: Cannot Push to GitHub

**Error: "Permission Denied"**

1. **Not authenticated:**

   ```bash
   # Set up credentials
   git config --global user.name "Your Name"
   git config --global user.email "your@email.com"
   ```

2. **Wrong repository URL:**

   ```bash
   # Check current remote
   git remote -v

   # Should show: https://github.com/CREHoldings/HB-Suites.git
   ```

3. **No repository access:**
   - Contact repository owner to add you as collaborator

**Error: "Failed to Push Some Refs"**

```bash
# Pull latest changes first
git pull origin main

# Then push
git push origin main
```

### Issue: Website Shows Old Content

**CDN Cache Delay:**

- Netlify uses a CDN (Content Delivery Network)
- Changes can take 1-5 minutes to propagate globally
- **Solution:** Wait a few minutes, then hard refresh

**Incorrect Deploy Published:**

1. Go to Netlify → Deploys
2. Find the correct deploy
3. Click "..." → "Publish deploy"

### Issue: Build Error After Update

**Syntax Error in JSON:**

1. **Validate JSON:**

   - Copy file contents
   - Paste into [JSONLint.com](https://jsonlint.com/)
   - Fix highlighted errors

2. **Common fixes:**
   - Add missing commas between objects
   - Remove trailing comma after last item
   - Ensure all quotes are double quotes `""`
   - Check all brackets are closed `{}` `[]`

**Dependency Error:**

- Contact developer
- May require `package.json` updates
- Might need `npm install` in deployment settings

### Getting Help

**If you encounter issues not covered here:**

1. **Check Netlify Documentation:**

   - [docs.netlify.com](https://docs.netlify.com/)

2. **Contact Developer:**

   - Provide specific error messages
   - Include screenshots
   - Share deployment URL from Netlify

3. **Emergency Rollback:**
   - Netlify dashboard → Deploys
   - Find last working deploy → Publish it
   - Site returns to working state immediately

---

## Backup and Recovery

### Automatic Backups

**Git Provides Automatic Version Control:**

- Every commit is a complete backup
- Full history is stored on GitHub
- Can restore any previous version at any time

**Netlify Deploy History:**

- Every deployment is preserved
- Can restore any previous deploy
- No data loss even if mistakes are made

### Creating Manual Backups

**Before Major Updates:**

1. **Backup Suite Status File:**

   ```bash
   # Create a dated backup
   cp public/suite-status.json public/suite-status.backup-2024-12-15.json
   ```

2. **Commit the Backup:**
   ```bash
   git add public/suite-status.backup-2024-12-15.json
   git commit -m "Backup suite status before major update"
   git push origin main
   ```

**Export Form Submissions Monthly:**

1. Netlify dashboard → Forms → Export
2. Download CSV file
3. Save to secure location (Google Drive, OneDrive, etc.)
4. Name with date: `form-submissions-2024-12.csv`

### Restoring from Backup

**Restore Suite Status File:**

1. **From Git History:**

   ```bash
   # View file history
   git log public/suite-status.json

   # Restore from specific commit
   git checkout <commit-hash> public/suite-status.json

   # Commit the restoration
   git commit -m "Restore suite status from previous version"
   git push origin main
   ```

2. **From Manual Backup:**

   ```bash
   # Copy backup over current file
   cp public/suite-status.backup-2024-12-15.json public/suite-status.json

   # Commit and push
   git add public/suite-status.json
   git commit -m "Restore suite status from manual backup"
   git push origin main
   ```

**Restore Previous Netlify Deploy:**

1. Netlify dashboard → Deploys
2. Browse deploy history
3. Find desired deploy
4. Click "..." → "Publish deploy"
5. Site immediately reverts to that version

### Disaster Recovery Plan

**If the website goes completely down:**

1. **Check Netlify Status:**

   - Visit [netlifystatus.com](https://www.netlifystatus.com/)
   - If Netlify is down, wait for service restoration

2. **Check Latest Deploy:**

   - If deploy failed, publish previous successful deploy

3. **Check Domain/DNS:**

   - Ensure domain is pointing to correct Netlify site
   - Check domain registrar settings

4. **Contact Support:**
   - Netlify support: [support.netlify.com](https://support.netlify.com/)
   - Provide site name, deployment ID, error messages

---

## Technical Architecture Overview

Understanding the technical stack helps with troubleshooting and future maintenance.

### Technology Stack

**Frontend Framework:**

- **React** - JavaScript library for building user interfaces
- **Vite** - Modern build tool for fast development

**Styling:**

- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Animation library for smooth transitions

**Hosting & Deployment:**

- **Netlify** - Hosting platform with CDN
- **GitHub** - Version control and code repository

**Forms:**

- **Netlify Forms** - Serverless form handling

### File Structure Explained

```
HB-Suites/
├── public/                    # Static files served directly
│   ├── suite-status.json     # ✅ Suite availability data
│   ├── robots.txt            # Search engine instructions
│   └── sitemap.xml           # Site structure for SEO
├── src/                      # Source code
│   ├── components/           # React components
│   │   ├── ContactUs.jsx    # Contact form component
│   │   ├── AvailableSuites.jsx  # Suite display component
│   │   └── ...
│   ├── data/                # Data files
│   ├── hooks/               # Custom React hooks
│   └── utils/               # Utility functions
├── docs/                    # Documentation
│   └── SUITE_STATUS_GUIDE.md  # This guide
├── package.json             # Dependencies and scripts
├── vite.config.js          # Build configuration
└── netlify.toml            # Netlify configuration
```

### Build Process

**What Happens When You Deploy:**

1. **Git Push** → GitHub receives your changes
2. **Webhook** → GitHub notifies Netlify
3. **Build Trigger** → Netlify starts build process
   ```bash
   npm install      # Install dependencies
   npm run build    # Build production files
   ```
4. **Output** → Creates `dist/` folder with optimized files
5. **Deploy** → `dist/` content uploaded to Netlify CDN
6. **Publish** → Site goes live at your URL

**Build Configuration (netlify.toml):**

- Build command: `npm run build`
- Publish directory: `dist`
- Redirects: All routes → `index.html` (SPA routing)

### Environment Variables

Currently, the site uses no environment variables. All configuration is in code or JSON files.

**If you need to add secrets in the future:**

- Never commit secrets to Git
- Use Netlify environment variables
- Netlify dashboard → Site settings → Environment variables

### Performance Optimizations

**Implemented:**

- Asset caching (31536000 seconds = 1 year)
- Gzip compression
- Image optimization
- Code splitting
- Lazy loading

**Security Headers:**

- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### Dependencies

**Key packages (from package.json):**

- `react`: UI library
- `react-dom`: DOM rendering
- `gsap`: Animations
- `@gsap/react`: React integration for GSAP
- `lucide-react`: Icon library
- `tailwindcss`: CSS framework
- `vite`: Build tool

**Updating Dependencies:**
(Requires developer knowledge - not for regular maintenance)

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Test thoroughly before deploying
npm run dev
```

---

## Quick Reference Cheat Sheet

### Common Tasks

| Task                | Command/Action                                                   |
| ------------------- | ---------------------------------------------------------------- |
| Update suite status | Edit `public/suite-status.json`                                  |
| Validate JSON       | Visit [JSONLint.com](https://jsonlint.com/)                      |
| Check changes       | `git status`                                                     |
| Deploy changes      | `git add .` → `git commit -m "message"` → `git push origin main` |
| View forms          | Netlify → Site → Forms                                           |
| Rollback deploy     | Netlify → Deploys → Previous → Publish                           |
| Start local dev     | `npm run dev`                                                    |

### Emergency Contacts

- **Netlify Support:** [support.netlify.com](https://support.netlify.com/)
- **GitHub Support:** [support.github.com](https://support.github.com/)
- **Developer:** [Contact information]

### Important URLs

- **Live Site:** [Your production URL]
- **Netlify Dashboard:** [https://app.netlify.com/](https://app.netlify.com/)
- **GitHub Repository:** [https://github.com/CREHoldings/HB-Suites](https://github.com/CREHoldings/HB-Suites)
- **JSON Validator:** [https://jsonlint.com/](https://jsonlint.com/)

---

## Maintenance Schedule Recommendations

### Daily

- Check form submissions
- Respond to inquiries

### Weekly

- Review and update suite availability
- Check for spam submissions

### Monthly

- Export form submissions (backup)
- Review website analytics
- Check for outdated information

### Quarterly

- Review and update content
- Check all links still work
- Test form functionality
- Review backup procedures

### Annually

- Dependency updates (requires developer)
- SSL certificate renewal (automatic on Netlify)
- Domain renewal
- Comprehensive content audit

---

## Conclusion

This guide covers all aspects of maintaining the HB Suites website. For questions or issues not covered here, contact the development team or refer to the official documentation of the respective services.

**Remember:**

- Always test locally when possible
- Validate JSON before deploying
- Keep backups of important data
- Don't hesitate to rollback if something goes wrong
- Document any changes you make

**Last Updated:** December 2024  
**Version:** 2.0
