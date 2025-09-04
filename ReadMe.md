# CSE Department Website — Documentation Report

## 1. Website Overview
This project is a responsive, accessible, multi-page website for a Computer Science & Engineering Department.
It takes inspiration from the SSN CSE department site for layout and content organization. The stack is **HTML5**, **CSS3**, and **vanilla JavaScript** only — with **no inline CSS/JS** as required.

## 2. Features Implemented
- **Responsive Navigation** with a mobile hamburger toggle (ARIA-compliant).
- **Faculty Search & Filter** by name/designation/expertise using JavaScript.
- **Contact Form Validation** (name, email format, subject, message length).
- **Placement Statistics** rendered as a vanilla JS `<canvas>` bar chart.
- **Multi-page Layout**: Home, About, Faculty, Infrastructure, Research, Student Corner, Contact.
- **Accessibility**: semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), alt text, keyboard-friendly controls, skip link.
- **Responsive Design** using Flexbox/Grid and media queries.
- **No inline CSS or JS** — all styles in `css/style.css`, scripts in `js/`.

## 3. Folder Structure
```
cse-department-website/
│── index.html
│── about.html
│── faculty.html
│── infrastructure.html
│── research.html
│── student.html
│── contact.html
│
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── faculty-search.js
│   ├── form-validation.js
│   └── placement-stats.js
├── images/
│   ├── logo.svg
│   ├── banner.svg
│   ├── lab-ai.svg
│   ├── lab-cyber.svg
│   ├── seminar.svg
│   └── faculty-avatar.svg
└── docs/
    └── report.md
```

## 4. How Responsiveness is Achieved
- **Fluid containers** and **CSS Grid/Flexbox** layouts adapt to screen size.
- **Media queries** collapse multi-column grids to single-column on mobile.
- Nav turns into a **hamburger menu** under 640px.

## 5. JavaScript Modules
- `main.js`: year auto-update, nav toggle.
- `faculty-search.js`: dynamic list rendering and filtering logic.
- `form-validation.js`: client-side validation with helpful error messages.
- `placement-stats.js`: simple `<canvas>` chart with sample data (replace with real stats).

## 6. Accessibility Highlights
- **Skip link** for keyboard users.
- **ARIA attributes** on nav toggle and live regions for dynamic content.
- **Sufficient color contrast** and clear focus styles.

## 7. Innovation & Extra Features
- **Canvas-based placement chart** (no external libraries).
- **Clean, modern visual language** using gradients and soft borders.
- **Semantic, commented codebase** for maintainability.

## 8. Notes for Customization
- Update faculty data in `js/faculty-search.js`.
- Replace placeholder images (SVGs) with real photos if available.
- Update Google Map iframe to a specific latitude/longitude or place ID if needed.
- Replace sample publications and projects with departmental data.

## 9. Testing Checklist
- ✅ Pages validate without errors (basic HTML/CSS checks).
- ✅ Keyboard-only nav works.
- ✅ Form validation blocks bad input and shows helpful messages.
- ✅ Layout scales from mobile to desktop.
- ✅ No inline CSS/JS. External files referenced correctly.
