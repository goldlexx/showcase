# Product Cart Demo

A small static JavaScript demo of a product list and shopping cart.

## Live Demo

[Open the cart demo](https://goldlexx.github.io/showcase/)

## Features

- Add products to the cart
- Prevent the same product from being added twice
- Remove a product by selecting it in the cart
- Recalculate the total when the cart changes

## Technologies

- HTML
- CSS
- Vanilla JavaScript

## Run locally

There is no package manifest or build step in this repository. Open `index.html` in a browser to view the page.

## Project structure

- `index.html` — product list and cart markup
- `style/style.css` — page styling
- `js/script.js` — cart interactions and total calculation

## Tests

Run the cart interaction tests with Node.js:

```sh
node --test js/script.test.js
```

The tests cover adding products, duplicate prevention, total calculation, and removal.
