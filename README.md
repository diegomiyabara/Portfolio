# Diego Miyabara's Portfolio

Demo: https://portfolio-kappa-cyan-32.vercel.app/

## Overview

This is a personal portfolio website built with React, TypeScript, and Vite. It was developed to showcase professional experience in e-commerce, Adobe Commerce / Magento 2, and modern web applications.

The interface uses a section slider to navigate between:

- Home
- About
- Skills
- Projects
- Contact

It also offers support for language switching between Portuguese and English, keyboard navigation, and smooth animations with framer-motion.

## Features

- Slider navigation with controls and indicators
- Autoplay with pause/resume button
- Responsive layout for desktop and mobile
- Language toggle (PT / EN)
- Project cards with demonstration links
- Skills section with custom icons
- Keyboard support (left/right arrows)

## Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- react-i18next
- Simple Icons
- ESLint
- Vitest

## Project Structure

- src/App.tsx — main application
- src/components/Layout.tsx — global layout with navbar and page structure
- src/components/SectionSlider.tsx — main sections slider
- src/components/Navbar.tsx — navigation bar and language toggle
- src/components/SkillsSection.tsx — skills list with icons
- src/components/ProjectsSection.tsx — project cards and delivery information
- src/components/ContactSection.tsx — contact area with links and form
- src/config/slides.tsx — slider sections definition
- src/i18n — internationalization configuration and translations
- src/data/techIcons.tsx — technology icons

## How to Run

### Install Dependencies

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Build Locally

```bash
npm run preview
```

## Available Scripts

- npm run dev — start the application in development mode
- npm run build — generate the production version
- npm run preview — preview the generated build
- npm run lint — run ESLint
- npm run test — run tests with Vitest
- npm run test:watch — run Vitest in watch mode

## Deployment

The project is published on Vercel:

[https://portfolio-diego-miyabaras-projects.vercel.app/](https://portfolio-diego-miyabaras-projects.vercel.app/)

### Steps for Free Deployment

1. Connect your repository to Vercel
2. Use npm run build as build command
3. Set dist as output directory
4. Automatic deployment on each push

## Customization

- Add new projects in src/i18n/locales/pt.json and src/i18n/locales/en.json
- Update icons in src/data/techIcons.tsx
- Modify sections in src/config/slides.tsx
- Adjust slider behavior in src/components/SectionSlider.tsx

---

Project created to demonstrate skills in front-end development, responsive animations, and e-commerce experience.

