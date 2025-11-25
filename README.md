

## Maintenance Guide

This guide provides a high-level overview of how to perform common maintenance tasks for the HB Suites website. For more detailed instructions, please refer to the [full maintenance guide](./docs/SUITE_STATUS_GUIDE.md).

### Updating Content (Suite Availability)

-   **What:** The list of available and leased suites.
-   **Where:** Edit the `public/suite-status.json` file.
-   **How:** Change the `status` of a suite to either `"available"` or `"leased"`.

### Managing Form Submissions

-   **What:** Inquiries submitted through the contact form.
-   **Where:** Submissions are managed in the Netlify dashboard.
-   **How:** Log in to Netlify, navigate to the site's "Forms" section to view and manage submissions.

### Deploying Updates

-   **What:** Pushing any changes (like updated suite statuses) to the live website.
-   **Where:** Deployments are handled by Netlify.
-   **How:** Commit and push your changes to the `main` branch on GitHub. Netlify will automatically build and deploy the new version of the site.

For detailed, step-by-step instructions on each of these processes, please see the [**Full Maintenance Guide**](./docs/SUITE_STATUS_GUIDE.md).

## License

Private project - All rights reserved.
