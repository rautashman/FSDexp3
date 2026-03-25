# React Concepts Implementation Guide

This document explains the core React concepts demonstrated in the **ReactMart** application, where they are implemented, and the purpose they serve.

## 1. Components
**Concept:** Components are the building blocks of any React application, allowing you to split the UI into independent, reusable pieces.
**Implementation:**
- The app uses functional components exclusively (e.g., `NavBar`, `ProductCard`, `Footer`).
- **Purpose:** Organizing the UI into modular, isolated pieces makes the code easier to read, test, and reuse. For example, `ProductCard.js` is reused multiple times to display different products in the `ProductList`.

## 2. Props
**Concept:** Props (short for properties) are how React components pass data from a parent component down to a child component.
**Implementation:**
- In `src/pages/HomePage.js`, the `ProductList` component is rendered and passed a `products` prop containing the highlighted products array: `<ProductList products={highlightedProducts} />`.
- In `src/components/ProductCard.js`, the component accepts a single `product` prop to render specific details (name, price, image).
- **Purpose:** Props make components highly reusable by allowing them to render dynamically based on the data given to them by their parent.

## 3. State (`useState`)
**Concept:** State is a component's localized memory. It allows the component to keep track of information that changes over time and trigger a UI re-render when that data changes.
**Implementation:**
- In `src/components/FilterBar.js`, `useState` keeps track of the `searchTerm` and `category` the user types before they click "Apply Filters".
- In `src/pages/ProductsPage.js`, an `isLoading` state is used to temporarily show a "Loading products..." message while faking a network request constraint with `setTimeout`.
- **Purpose:** It handles user interactivity and temporary UI states (like form inputs, toggles, and loading spinners) that don't need to be shared globally with the rest of the application.

## 4. Redux Toolkit (Global State)
**Concept:** Redux is a predictable global state container. `react-redux` allows any component to access or update this global data without needing to pass props down manually through multiple deep layers of components (a problem known as "prop drilling").
**Implementation:**
- The application's cart memory is stored actively in Redux (`src/redux/cartSlice.js`).
- **Accessing Global State (`useSelector`):** Components like `CartPage.js` and `NavBar.js` use `useSelector((state) => state.cart)` to independently read the cart items and dynamically calculate total items or aggregate pricing.
- **Updating Global State (`useDispatch`):** The `ProductCard.js` uses `useDispatch` to issue an `addToCart` action immediately into Redux memory when a user clicks the Add to Cart button.
- **Purpose:** To easily share and mutate identical data sets (like the shopping cart) across entirely different branches of components and pages.

## 5. Routing (React Router)
**Concept:** Client-side Routing allows a single-page application (SPA) to mimic a multi-page website by rendering entirely different component trees based on the current browser URL.
**Implementation:**
- Set up centrally in `src/App.js` using `<Routes>` and `<Route>` components from `react-router-dom`.
- Example: `<Route path="/products" element={<ProductsPage />} />`.
- **Purpose:** It enables the app to have distinct designated pages (Home, Products, Cart, About) while technically remaining heavily optimized as a single HTML file under the hood.

## 6. Path Parameters
**Concept:** Path parameters are dynamic segments in the structure of a URL route pathway used to capture variable values.
**Implementation:**
- In `src/App.js`, the dynamic route is defined as `<Route path="/products/:id" element={<ProductDetailsPage />} />`.
- In `src/pages/ProductDetailsPage.js`, the `useParams` custom hook is used to extract the variable `id` from the URL, which is then used to find the exact product details from the master products array.
- **Purpose:** It allows developers to configure a single dynamic layout component (`ProductDetailsPage`) to display unique data for thousands of distinct products based strictly on the URL identity.

## 7. Query Parameters
**Concept:** Query parameters are discretionary key-value pairs appended to the end of a URL (after a `?`) used globally to sort, filter, flag, or search through items on a respective page.
**Implementation:**
- In `src/pages/ProductsPage.js` and `src/pages/SearchPage.js`, the `useSearchParams` hook evaluates the URL exactly like traditional website analytics do.
- Example URL generated in App: `/products?search=phone&category=electronics`.
- **Purpose:** By storing UI filter settings directly in the active URL, users can refresh natively, bookmark it, or share the active link organically with others, and the web app will systematically load with the exact same filters applied at boot.

## 8. Navigation Without Reload
**Concept:** In a SPA, clicking an internal link should not cause the browser to perform a full server page request/refresh, which translates as very sluggish and completely erases local and unpersisted UI state.
**Implementation:**
- In `src/components/NavBar.js` and systematically throughout the codebase, the `<Link>` component supplied by `react-router-dom` is utilized strictly over traditional native `<a href="...">` anchor tags. 
- Example: `<Link to="/cart">Cart</Link>`.
- **Purpose:** It intercepts typical browser navigation actions and handles them locally in JavaScript, providing virtually instantaneous client-rendered transitions between page routes, preserving vital global state contexts (like Redux Cart memory), and ensuring an uncompromised user experience.

## 9. React Hooks
**Concept:** Hooks are special functions that allow functional components to "hook into" React features like state and lifecycle methods, without needing to write class components.
**Implementation:**
- The application heavily relies on built-in React hooks (`useState` for local memory, `useEffect` for simulating network requests on render), React Router hooks (`useParams` to read dynamic URLs, `useSearchParams` to sync filters to URLs, `useLocation` to read active paths), and Redux hooks (`useSelector` to read global state, `useDispatch` to send global actions).
- **Purpose:** They encapsulate reusable, stateful logic, allowing simple functional components to perform highly complex and interactive tasks in a clean, isolated, and highly readable manner.
