# Editing Suite Statuses via GitHub Web Interface

This guide explains how to update suite availability by editing the `suites.json` file directly through GitHub's web interface, without needing to use command line tools.

## Prerequisites

- Access to the GitHub repository for the HB Suites website
- Appropriate permissions to edit files in the repository

## Step-by-Step Instructions

### 1. Navigate to the File

1. Go to your GitHub repository in a web browser
2. Navigate to the `public` folder
3. Find and click on the `suites.json` file

### 2. Edit the File

1. Click the **pencil icon** (✏️) in the top-right corner of the file view
   - Alternative: Click the three dots menu and select "Edit file"
   
2. You'll now see an editable text editor in your browser

### 3. Make Your Changes

1. Locate the suite(s) you want to update in the JSON array
2. Change the `"status"` value:
   - For available suites: `"status": "available"`
   - For leased suites: `"status": "leased"`
   - For special handling: `"status": "8"` (treated as leased)

3. **Examples:**
   ```json
   // To mark Suite 101 as leased:
   { "id": "Suite 101", "status": "leased" }
   
   // To mark Suite 102 as available:
   { "id": "Suite 102", "status": "available" }
   
   // To mark Suite 103 with special "8" status (treated as leased):
   { "id": "Suite 103", "status": "8" }
   ```

### 4. Commit Your Changes

1. Scroll down to the "Commit changes" section
2. Add a commit message describing what you changed:
   - Example: "Update suite statuses: Suites 101 and 105 now leased"
   - Example: "Mark Suite 102 as available"
   
3. Choose your commit options:
   - For small changes: Select "Commit directly to the [main/primary branch]" 
   - For larger changes: Select "Create a new branch for this commit and start a pull request"

4. Click the **"Commit changes"** button

### 5. Verify Your Changes

1. After committing, you'll see the updated file
2. Verify that your changes appear correctly in the JSON
3. The website will automatically pull the updated data (may take a few minutes to reflect on the live site depending on caching)

## Important Notes

### Special Status Values

- **Status "8"**: Treated as "leased" on the website
- **Other invalid statuses**: Treated as "available" on the website
- **Valid statuses**: Only "available" and "leased" are standard values

### JSON Format Requirements

- Maintain valid JSON syntax
- Each suite object must have both `id` and `status` properties
- Use double quotes for all strings
- Maintain proper comma separation between array items
- Don't add trailing commas after the last item in arrays or objects

### Best Practices

1. **Always test your JSON**: Use an online JSON validator if you're unsure
2. **Make small changes**: Update a few suites at a time to minimize errors
3. **Descriptive commit messages**: Explain what changes were made
4. **Backup**: Consider copying the original content before making major changes
5. **Check the website**: Verify that changes appear correctly after deployment

## Troubleshooting

### If you see an error after committing:

1. **JSON Syntax Error**: Check for missing commas, extra commas, or unmatched brackets
2. **File not updating**: Wait a few minutes for the changes to propagate, then refresh the website
3. **Invalid statuses**: Check the browser console for warnings about invalid status values

### If the website doesn't update:

1. Hard refresh the browser (Ctrl+F5 or Cmd+Shift+R)
2. Check that the JSON syntax is valid
3. Verify your commit was successful in the repository's commit history

## Need Help?

If you encounter issues:

1. Check the MAINTENANCE_GUIDE.md for more detailed technical information
2. Contact the website administrator
3. Look for error messages in your browser's developer console

---
**Last Updated:** November 2025