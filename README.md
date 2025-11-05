# HB Suites - Health and Beauty Suite Website

A modern, performance-optimized website for HB Suites featuring luxury furnished office spaces.

## Features

✅ **Fast Loading Speed** - Optimized to load in under 3 seconds  
✅ **SEO Friendly** - Complete meta tags, Open Graph, and semantic HTML  
✅ **ADA/WCAG Compliant** - Full accessibility support with ARIA labels and keyboard navigation  
✅ **Secure** - HTTPS ready, XSS protection, input sanitization  
✅ **Browser Compatible** - Works on Chrome, Safari, Edge, Firefox  
✅ **Easy Content Updates** - Centralized content configuration  
✅ **Spam-Protected Forms** - Honeypot, rate limiting, input validation  
✅ **Comprehensive Documentation** - Full maintenance and deployment guides

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd "Health and Beauty Suite"
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:5173`

## Project Structure

```
├── public/                 # Static assets (images, robots.txt, sitemap.xml)
├── src/
│   ├── components/         # React components
│   │   ├── Header.jsx      # Navigation header
│   │   ├── Hero.jsx        # Hero section with slideshow
│   │   ├── ContactUs.jsx   # Contact section
│   │   ├── ContactForm.jsx # Secure contact form
│   │   └── ...
│   ├── config/
│   │   └── content.js      # Content configuration (UPDATE THIS FOR CONTENT CHANGES)
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── docs/
│   └── MAINTENANCE_GUIDE.md # Detailed maintenance guide
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies

```

## Updating Content

### Easy Content Updates

All website content can be updated in **one file** without touching component code:

📁 **`src/config/content.js`**

Update:

- Site information (title, description, keywords)
- Contact information (address, phone, email, hours)
- Navigation items

**Example:** To update phone number, edit `src/config/content.js`:

```javascript
phone: "(555) 987-6543",  // Change this value
```

See [MAINTENANCE_GUIDE.md](./docs/MAINTENANCE_GUIDE.md) for detailed instructions.

## Building for Production

1. **Build the project:**

   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Preview production build:**

   ```bash
   npm run preview
   # or
   yarn preview
   ```

3. **Deploy:**
   - Upload contents of `dist/` folder to your web server
   - Configure server for Single Page Application (SPA)

## Deployment

### Recommended Platforms

- **Netlify** - Automatic deployments from Git
- **Vercel** - Excellent for React apps
- **Traditional Hosting** - Upload `dist/` folder contents

### Build Configuration

- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Node Version:** 18+

## Features Explained

### 1. Fast Loading Speed

- Lazy loading for images
- Code splitting and chunk optimization
- Minified assets
- Optimized build configuration

### 2. SEO Optimization

- Complete meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card support
- Semantic HTML structure
- `robots.txt` and `sitemap.xml`

### 3. Accessibility (ADA/WCAG)

- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader compatibility
- Semantic HTML structure

### 4. Security

- Content Security Policy headers
- Input sanitization
- XSS protection
- Honeypot spam protection
- Rate limiting on forms

### 5. Browser Compatibility

- Tested on Chrome, Safari, Edge, Firefox
- Modern JavaScript (ES2015+)
- CSS with vendor prefixes via Tailwind
- Polyfills included where needed

### 6. Contact Form Security

- **Honeypot field** - Catches automated bots
- **Input sanitization** - Prevents XSS
- **Rate limiting** - 5 submissions per hour
- **Email validation** - Ensures valid emails

**Note:** Form requires backend endpoint configuration. See [MAINTENANCE_GUIDE.md](./docs/MAINTENANCE_GUIDE.md).

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 19** - UI library
- **Vite 6** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **GSAP** - Animations
- **Lucide React** - Icons
- **Embla Carousel** - Image carousel

## Documentation

- **Maintenance Guide:** [docs/MAINTENANCE_GUIDE.md](./docs/MAINTENANCE_GUIDE.md)
  - Updating content
  - Managing forms
  - Deployment instructions
  - Troubleshooting

## Browser Support

- ✅ Chrome (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Firefox (latest)

## Performance

- **Target Load Time:** < 3 seconds
- **Optimizations:**
  - Lazy loading images
  - Code splitting
  - Asset minification
  - Browser caching

## Security

- HTTPS ready
- Content Security Policy
- Input sanitization
- XSS protection
- Spam protection on forms

## Contributing

1. Make changes to content in `src/config/content.js`
2. Test changes locally with `npm run dev`
3. Build for production with `npm run build`
4. Deploy to hosting platform

## Support

For detailed instructions, see:

- **Maintenance Guide:** [docs/MAINTENANCE_GUIDE.md](./docs/MAINTENANCE_GUIDE.md)
- **Content Updates:** Edit `src/config/content.js`

## License

Private project - All rights reserved.

---

**Version:** 1.0.0  
**Last Updated:** January 2024
