# E-commerce App

A modern React e-commerce application using Fake Store API for product management and user authentication.

## Features

- Product catalog with advanced filtering:
  - Search by product name
  - Filter by category
  - Sort by price (ascending/descending)
- Pagination (10 products per page)
- User Authentication:
  - Login with provided test credentials:
    ```
    username: "mor_2314", password: "83r5^_"
    username: "johnd", password: "m38rmF$"
    ```
  - Sign up functionality (mock implementation)
- Protected Features (requires login):
  - Shopping cart management
  - Product creation
- Product Details View
- Responsive design for all devices
- Persistent cart data per user

## API Limitations

- New product creation and sign up requests will return success responses but won't persist data
- Attempting to access newly created resources will result in 404 errors
- Cart data is persisted locally only

## Tech Stack

- React 18
- TypeScript

## Prerequisites

- Node.js
- npm

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
