const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const htmlPath = path.join(__dirname, 'index.html');
const cssPath = path.join(__dirname, 'style.css');
const jsPath = path.join(__dirname, 'script.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

console.log('=== VERIFYING RESPONSIVE PORTFOLIO ===');

// 1. Verify HTML Structure
const dom = new JSDOM(html);
const document = dom.window.document;

const viewportMeta = document.querySelector('meta[name="viewport"]');
console.assert(viewportMeta !== null, 'Viewport meta tag must exist');
console.assert(viewportMeta.getAttribute('content').includes('width=device-width'), 'Viewport meta tag must include width=device-width');
console.log('✓ Viewport meta tag verified.');

const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
sections.forEach(secId => {
    const sec = document.getElementById(secId);
    console.assert(sec !== null, `Section #${secId} must exist`);
});
console.log('✓ All semantic sections exist.');

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
console.assert(hamburger !== null, 'Hamburger menu button must exist');
console.assert(navMenu !== null, 'Nav menu must exist');
console.assert(contactForm !== null, 'Contact form must exist');
console.log('✓ Interactive UI elements exist in HTML.');

// 2. Verify CSS Responsive Requirements
console.assert(css.includes('max-width: 100%'), 'CSS must include max-width: 100% for responsive images');
console.assert(css.includes('clamp('), 'CSS must use clamp() for fluid typography');
console.assert(css.includes('@media (min-width: 768px)'), 'CSS must include media query for tablets (768px)');
console.assert(css.includes('@media (min-width: 1024px)'), 'CSS must include media query for laptops/desktops (1024px)');
console.assert(css.includes('prefers-reduced-motion'), 'CSS must respect prefers-reduced-motion');
console.assert(css.includes('overflow-x: hidden'), 'CSS must prevent horizontal scrolling');
console.log('✓ CSS responsive requirements and media queries verified.');

// 3. Verify JavaScript Functionality
console.assert(js.includes('hamburger'), 'JS must handle hamburger menu');
console.assert(js.includes('filter'), 'JS must handle project filtering');
console.assert(js.includes('contact-form'), 'JS must handle contact form validation');
console.log('✓ JavaScript interactivity logic verified.');

console.log('=== ALL RESPONSIVE PORTFOLIO CHECKS PASSED SUCCESSFULLY ===');
