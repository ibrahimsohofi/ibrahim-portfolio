# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# Ibrahim Sohofi - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, Tailwind CSS, and GSAP animations.

## Features

- Responsive design works on all device sizes
- Animated UI elements using GSAP
- Interactive sections for About, Projects, and Contact
- Particle background effects
- Clean, modern design with smooth scrolling
- Social media links and resume download

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- GSAP (GreenSock Animation Platform)
- Vite
- Framer Motion
- tsParticles

## Getting Started

### Prerequisites

- Node.js 16+ or Bun
- Git

### Installation

1. Clone the repository:
```
git clone https://github.com/ibrahimsohofi/ibrahim-portfolio.git
cd ibrahim-portfolio
```

2. Install dependencies:
```
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

3. Start the development server:
```
# Using Bun
bun run dev

# Or using npm
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```
# Using Bun
bun run build

# Or using npm
npm run build
```

## Deployment

This project is configured for easy deployment to Netlify. Connect your GitHub repository to Netlify for automatic deployments.

## License

MIT License

## Contact

Ibrahim Sohofi - [@ibrahimsohofi](https://twitter.com/ibrahimsohofi) - [LinkedIn](https://www.linkedin.com/in/ibrahimsohofi/)
