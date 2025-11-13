# How to Update Suite Availability Status

This guide explains how to update which suites are available or leased by editing a simple JSON file.

## Quick Start

The suite status is controlled by one file: `/public/suite-status.json`

## Editing on GitHub (Recommended for Non-Technical Users)

### Step 1: Find the File

1. Go to your GitHub repository
2. Click on the `public` folder
3. Click on `suite-status.json`

### Step 2: Edit the File

1. Click the **pencil icon (✏️)** at the top right
2. The file will open in edit mode

### Step 3: Update Suite Status

Find the suite you want to update and change its status:

```json
{ "id": "11", "status": "available" }  ← Suite is available
{ "id": "8", "status": "leased" }      ← Suite is leased
```

**Only change the word after "status":**

- Use `"available"` for available suites
- Use `"leased"` for leased suites

### Step 4: Save Your Changes

1. Scroll to the bottom
2. Type a brief description like: "Updated suite 11 to available"
3. Click **"Commit changes"**
4. Click **"Commit changes"** again to confirm

### Step 5: Done!

Your changes will appear on the website within a few minutes.

---

## Editing Locally (For Developers)

### Step 1: Open the File

Navigate to `/public/suite-status.json` in your code editor

### Step 2: Update Status

Change the status value for any suite:

```json
{
  "suites": [
    { "id": "5", "status": "leased" },
    { "id": "11", "status": "available" },
    { "id": "8", "status": "available" }
  ]
}
```

### Step 3: Save and Deploy

1. Save the file
2. Commit your changes: `git add public/suite-status.json`
3. Commit: `git commit -m "Updated suite statuses"`
4. Push: `git push`

---

## Important Rules

### ✅ DO:

- Only change the status values (`"available"` or `"leased"`)
- Keep the double quotes around status values
- Save the file after making changes

### ❌ DON'T:

- **Don't change suite IDs** - these match the floorplan
- **Don't remove commas** between suite entries
- **Don't remove the last curly brace** `}`
- **Don't edit** the `/src/data/suiteOccupancy.js` file (this has the floorplan positions)

---

## Quick Reference

### Valid Status Values

- `"available"` - Suite is available for lease
- `"leased"` - Suite is currently leased

### File Structure

```json
{
  "suites": [
    { "id": "SUITE_NUMBER", "status": "available or leased" },
    { "id": "SUITE_NUMBER", "status": "available or leased" }
  ]
}
```

---

## Common Mistakes

### Missing Comma

❌ **Wrong:**

```json
{ "id": "11", "status": "available" }
{ "id": "8", "status": "leased" }
```

✅ **Correct:**

```json
{ "id": "11", "status": "available" },
{ "id": "8", "status": "leased" }
```

### Wrong Quotes

❌ **Wrong:**

```json
{ "id": "11", "status": "available" }
```

✅ **Correct:**

```json
{ "id": "11", "status": "available" }
```

### Misspelled Status

❌ **Wrong:**

```json
{ "id": "11", "status": "availble" }
```

✅ **Correct:**

```json
{ "id": "11", "status": "available" }
```

---

## Need Help?

If you see an error message:

1. Check that all commas are in place
2. Make sure all quotes are double quotes `"`
3. Verify status is either `"available"` or `"leased"`
4. Use an online JSON validator if needed: https://jsonlint.com

---

**Last Updated:** November 13, 2025
