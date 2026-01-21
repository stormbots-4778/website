# Stormbots 4778 Website

FRC Team 4778 Stormbots - Official team website built with raw HTML, CSS, and JavaScript.

## Project Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── main.js             # JavaScript functionality
├── public/             # Static assets
│   ├── favicon.ico
│   └── robots.txt
└── assets/             # Images and data files
    ├── logos/          # Sponsor logos
    └── outreach/       # Outreach photos
```

## Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

## Deployment

This is a static website - just upload the files to any web host or use GitHub Pages.

To deploy to GitHub Pages:
1. Push changes to the main branch
2. Enable GitHub Pages in repository settings
3. Set the source to the root directory

## Features

- Responsive design for all screen sizes
- Smooth scrolling navigation
- Dynamic meeting calendar
- Scrolling sponsor logos
- Outreach image carousel
- Mobile-friendly navigation menu

## Customization

### Adding Sponsors
Edit `assets/logos/logos.json` to add sponsor entries:
```json
[
  {
    "name": "Sponsor Name",
    "filename": "logo.svg",
    "url": "https://sponsor-website.com"
  }
]
```
Then add the logo file to `assets/logos/`.

### Adding Outreach Images
Edit `assets/outreach/outreach.json` to add image entries:
```json
[
  {
    "filename": "event.jpg",
    "caption": "Event description"
  }
]
```
Then add the image file to `assets/outreach/`.

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).
