## Product Gallery – React + Redux Demo

This project is a small product catalog application built with React, React Router, Redux Toolkit, and Styled Components.

It implements:
- **Product listing page** with search, category filter, size filter, skeleton loading, and “load more” pagination (no page numbers).
- **Product details page** with a larger image and full product information.
- **Global state management** using Redux Toolkit.
- **React Context** for UI theme (light/dark) toggling.
- **Search and filter persistence** across refreshes and navigation using `localStorage` and URL query parameters.

### Tech Stack

- **React + Vite** (React functional components with hooks)
- **React Router v6** for routing
- **Redux Toolkit + React Redux** for state management
- **React Context** for UI theme
- **Styled Components** for component-level styling
- **Basic CSS** (`index.css`) for global layout resets

### State Management Design

- **Redux (required)**:
  - Used for all **product data and filters**: product list, product details, loading/error states, search text, category and size filters, and “load more” visibility.
  - This keeps domain/data state centralized, predictable, and easy to debug.
- **React Context (preferred)**:
  - Used separately for **UI-level state**: a global light/dark theme toggle managed by `UIContext`.
  - This shows a realistic use of Context for cross-cutting UI concerns that multiple components (e.g., layout, cards) can consume, without mixing it into Redux.

### Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open the URL printed in the terminal (usually `http://localhost:5173`).

### Data Source & Assumptions

- Products are loaded from the public API `https://dummyjson.com/products?limit=100`.
- Each product card displays:
  - Image (using `thumbnail` or the first `images` entry)
  - Title
  - Price
  - Short description (description truncated to roughly 120 characters)
- The API does **not** provide size information. To satisfy the **size filter** requirement:
  - A derived `size` field is added to each product, cycling deterministically across `S`, `M`, `L`, and `XL` based on the product id.
  - The details page shows this as an “approx. size”.

### Filters, Search & Persistence

- **Search**: Filters by product title only (case-insensitive).
- **Category filter**: Populated dynamically from the loaded product categories.
- **Size filter**: Uses the derived `size` field.
- **Persistence**:
  - Redux holds the current filter state.
  - A small middleware writes `search`, `category`, and `size` to `localStorage`.
  - On app start, the filters slice reads from `localStorage`.
  - The list page also syncs filters with the URL (`?q=…&category=…&size=…`) so state is preserved on refresh and when navigating between pages.

### Pagination Strategy

- The app **does not use numbered pagination**.
- Instead, it:
  - Loads at least 100 products from the API in a single request.
  - Renders an initial subset and exposes a **“Load more”** button to progressively show more products, which improves first-render performance.

### Error Handling & Loading States

- **Loading**:
  - The list page shows a responsive grid of **skeleton cards** while products are being fetched.
  - The details page shows skeleton placeholders if the product is still loading.
- **Errors**:
  - The list page displays a dismissible error box with a **Retry** button.
  - The details page shows an inline error if an individual product cannot be loaded.

### Optional Enhancements Implemented

- Skeleton loading on both list and details views.
- Search and filter persistence across refreshes and route changes.

