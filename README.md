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

### Refactorization 🤞
- Break the components into even smaller ones. E.g.: `components/categories/anxiety/inputs` which will allow to use the components themselves in the calendar and in the 'daily'
- Divide classes into global and local to preserve DRY

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
