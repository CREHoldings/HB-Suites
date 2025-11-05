# HB Suites Website - Maintenance Guide

This guide provides instructions for updating content, managing form submissions, and deploying updates to the HB Suites website.

## Table of Contents

1. [Updating Content](#updating-content)
2. [Managing Contact Form Submissions](#managing-contact-form-submissions)
3. [Deploying Updates](#deploying-updates)
4. [Troubleshooting](#troubleshooting)

---

## Managing Contact Form Submissions

### Form Security Features

The contact form includes several security features:

1. **Honeypot Field** - Catches automated spam bots
2. **Input Sanitization** - Prevents XSS attacks
3. **Rate Limiting** - Limits submissions to 5 per hour per user
4. **Email Validation** - Ensures valid email addresses

### Setting Up Form Backend

The form currently submits to `/api/contact`. You need to set up a backend endpoint to receive and process submissions.

#### Option 1: Use a Third-Party Service

Recommended services:

- **Formspree** - Easy setup, no backend required
- **Netlify Forms** - If hosting on Netlify
- **SendGrid** - For email delivery

#### Option 2: Create Your Own Backend

Update the endpoint in `src/config/content.js`:

```javascript
contactForm: {
  endpoint: "https://your-backend.com/api/contact",
  // ...
}
```

### Processing Form Submissions

When a form is submitted, the backend will receive:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "message": "I'm interested in your suites...",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "userAgent": "Mozilla/5.0..."
}
```

### Email Protection

To hide email addresses from spam bots:

1. Use a contact form instead of displaying emails directly
2. Use JavaScript to obfuscate email addresses (currently emails are displayed)
3. Use a contact form service that handles email forwarding

**Recommendation:** Consider replacing visible email addresses with a "Contact Us" form button.

---

## Deploying Updates

### Prerequisites

- Node.js 18+ installed
- Access to your hosting platform
- Git (for version control)

### Development Setup

1. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start Development Server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **View Changes:**
   - Open `http://localhost:5173` in your browser
   - Changes will hot-reload automatically

### Building for Production

1. **Build the Project:**

   ```bash
   npm run build
   # or
   yarn build
   ```

   This creates an optimized production build in the `dist/` folder.

2. **Preview Production Build:**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

### Deployment Platforms

#### Netlify

1. Connect your Git repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on git push

#### Vercel

1. Connect your Git repository to Vercel
2. Vercel will auto-detect Vite settings
3. Deploy automatically on git push

#### Traditional Hosting (cPanel, FTP, etc.)

1. Run `npm run build`
2. Upload contents of `dist/` folder to your web server
3. Ensure your server is configured for Single Page Applications (SPA)

### Post-Deployment Checklist

- [ ] Verify site loads correctly
- [ ] Test contact form submission
- [ ] Check all links work
- [ ] Verify images load
- [ ] Test on mobile devices
- [ ] Run Google PageSpeed Insights
- [ ] Check accessibility with aXe or similar tool

---

## Troubleshooting

### Common Issues

#### 1. Images Not Loading

- Check image paths (should start with `/` for public folder)
- Verify images exist in `public/` folder
- Clear browser cache

#### 2. Form Not Submitting

- Check browser console for errors
- Verify backend endpoint is configured correctly
- Ensure CORS is enabled on backend if needed

#### 3. Build Errors

- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: Delete `.vite` folder if it exists
- Check Node.js version (should be 18+)

#### 4. Styling Issues

- Clear browser cache
- Verify Tailwind CSS is building correctly
- Check for CSS conflicts

### Getting Help

If you encounter issues:

1. Check the browser console for errors
2. Review the build logs
3. Check that all dependencies are installed
4. Verify Node.js version matches requirements

---

## Performance Optimization

The website is already optimized for:

- ✅ Fast loading (< 3 seconds)
- ✅ Lazy loading images
- ✅ Code splitting
- ✅ Minification
- ✅ Browser caching

### Additional Optimizations

If you need further optimization:

1. **Image Optimization:**

   - Use WebP format for images
   - Compress images before uploading
   - Consider using a CDN for images

2. **Content Delivery Network (CDN):**

   - Use a CDN for static assets
   - Consider Cloudflare or similar

3. **Monitoring:**
   - Set up Google Analytics
   - Use Lighthouse for performance monitoring
   - Monitor Core Web Vitals

---

## Security Best Practices

The website includes:

- ✅ Input sanitization
- ✅ XSS protection
- ✅ Honeypot spam protection
- ✅ Rate limiting

### Additional Security Measures

1. **HTTPS:**

   - Ensure your hosting provides SSL/TLS
   - Force HTTPS redirects

2. **Content Security Policy:**

   - Already configured in `index.html`
   - Adjust if adding new third-party services

3. **Regular Updates:**
   - Keep dependencies updated
   - Run `npm audit` regularly
   - Update packages: `npm update`

---

## Browser Compatibility

The website is tested and compatible with:

- ✅ Chrome (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Firefox (latest)

### Supporting Older Browsers

If you need to support older browsers:

1. Adjust `target` in `vite.config.js`
2. Add polyfills for older browsers
3. Test thoroughly in target browsers

---

## Support

For technical support or questions:

1. Review this guide first
2. Check the project README.md
3. Review code comments in source files
4. Contact me :matinadekola33@gmail.com

---

**Last Updated:** January 2024
