# PixelYear PWA

### Tech stack:
Frontend: 
Framework - Vue -> Nuxt 3
State menagement - pinia
Login via facebook and gmail (a little tricky)
Login through the application itself, JWT token

### To do:
- https://dev.to/rdegges/please-stop-using-local-storage-1i04
- Fix problems with `navigateTo()`
- After registration, a panel for the user to choose which categories he wants to fill daily 
- Ability to create your own categories 

### Refactorization 🤞
- Rethink creating a layout for all pages
- Moving between categories should be dynamic (support for custom categories)

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on https://localhost:3000

```bash
npm run https
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
