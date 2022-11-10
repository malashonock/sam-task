# Test Task for SaM Solutions Internship

## Running the app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  
In the project directory, run `npm start`, then open [http://localhost:3000](http://localhost:3000) to view the app in the browser.  
Alternatively, you can visit the deployed version at [https://malashonock-online-store.netlify.app](https://malashonock-online-store.netlify.app).  

## Implemented features

- Guitar cards are fetched from the local json file.
- Filter dimension values are defined dynamically, based off the actual contents of the json file.
- Filtering is available by:
  - Category
  - Brand
  - Color
  - Availability in stock
  - Price range
- Guitars can also be filtered by model using an arbitrary text query
- Sorting is available by:
  - Model (alphabetically)
  - Price
- Each guitar card has the following content:
  - Photo
  - Model name
  - Price
  - Add to cart/Add one more button
- Shopping car is implemented as follows:
  - Clicking on Add to cart/Add one more adds +1 item to cart
  - Line items are removed as a whole by clicking on the close button in the cart
  - Checkout button is disabled if no items has been added to cart yet
  - The cart icon has a badge that indicates the total number of items added to cart
  - At the bottom of the cart the total amount of the order is shown
  - The cart cannot have more than 20 items. Any attempt to add more items is blocked with a popup message.
  - Clicking on the Checkout button shows a popup message that either dismisses after 3s or can be closed, after which the shopping cart is emptied.
- The user has a few options to clear selections:
  - Clear shopping cart
  - Clear filters
  - Reset sorting
  - Clear everything
- Filters, sorting and shopping cart state are persisted to local storage

## Technologies used

- TypeScript
- React:
  - create-react-app
  - function components
  - hooks: useState, useContext, useReducer
- Vanilla Bootstrap:
  - overall layout & styling
  - accordeons (in all filters except price range)
  - clear selection and other buttons
  - badge (in shopping cart icon)
  - toasts (for shopping cart overflow & checkout notifications)
- Vanilla Material Design Components:
  - dual-range slider (in filter by price range)
  - text field (in search bar)
  - select (in sorting dropdown)
- SCSS and SCSS modules for custom styling
- React Testing Library
- ESLint with AirBnB config
