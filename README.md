# EShop Ecommerce App

A modern ecommerce storefront built with React, Vite, and Appwrite. The app includes a product catalog, product details, cart management, checkout flow, receipt page, Arabic/English language support, USD/EGP currency switching, and Appwrite integration for backend services.

## Features

- Product catalog with local dummy data
- Product details pages
- Add to cart, remove from cart, and update quantities
- Checkout form and receipt page
- Search products by title
- Filter products by category and price range
- English and Arabic UI with RTL support
- USD and EGP currency toggle
- Toast notifications
- Appwrite integration for backend functionality
- Responsive layout for desktop and mobile

## Tech Stack

- React
- Vite
- Appwrite
- React Router
- Tailwind CSS
- i18next
- React Icons
- rc-slider
- ESLint
- GitHub Pages

## Project Structure

```text
src/
  components/       Reusable UI components
  context/          Cart, currency, and toast providers
  data/             Dummy products and Arabic product/category text
  locales/          English and Arabic translations
  pages/            App pages
  utils/            Shared helpers
  appwriteconfig.js Appwrite client configuration
  App.jsx           Routes
  main.jsx          App entry point
