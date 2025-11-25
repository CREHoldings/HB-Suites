# Maintenance Guide

This guide provides instructions for maintaining the HB Suites website, including updating suite availability, managing form submissions, and deploying changes.

## Updating Suite Status

The availability of salon suites is managed through a simple JSON file. This allows for quick updates without needing to modify the website's code.

### 1. Locate the Data File

The suite status information is stored in the following file:

`public/suite-status.json`

### 2. Edit the File

Open `suite-status.json` in a text editor. The file contains a list of all suites with their corresponding `id` and `status`.

```json
{
  "suites": [
    { "id": "1", "status": "leased" },
    { "id": "2", "status": "leased" },
    { "id": "11", "status": "available" },
  ]
}
```

### 3. Update the Status

To change a suite's status, find the corresponding `id` and modify the `status` value.

- **To mark a suite as available:** Change the `status` to `"available"`.
- **To mark a suite as leased:** Change the `status` to `"leased"`.

**Example:** To make suite with `id` 11 leased, change:

```json
{ "id": "11", "status": "available" }
```

to:

```json
{ "id": "11", "status": "leased" }
```

### 4. Save and Deploy

Once you've made your changes, save the file. The updates will be live after you deploy the changes.

## Managing Form Submissions

The website uses Netlify Forms to handle submissions from the "Contact Us" page.

### Accessing Submissions

1.  Log in to your [Netlify account](https://app.netlify.com/).
2.  Navigate to the HB Suites project site.
3.  Go to the **Forms** section in the main navigation.
4.  Here, you will find all submissions from the contact form, which you can browse, search, and export.

### Spam Filtering

Netlify includes spam filtering for form submissions. You can manage these settings and review submissions marked as spam in the same "Forms" section.

## Deploying Updates

The website is hosted on Netlify, and deployments are automated through Git.

### Standard Deployment Process

1.  **Commit and Push Changes:** After making any changes to the website (like updating the suite status), commit the changes to your local Git repository and push them to the main branch on GitHub (e.g., `main` or `master`).

    ```bash
    git add .
    git commit -m "Update suite 11 to leased"
    git push origin main
    ```

2.  **Automatic Build:** Pushing to the main branch automatically triggers a new build and deployment on Netlify.

3.  **Monitor Deployment:** You can monitor the deployment progress in the **Deploys** section of your site's dashboard on Netlify. If the build is successful, the changes will be live within a few minutes.
