const products = [
  { id: 1, title: 'Lenovo Yoga', price: 3000 },
  { id: 2, title: 'Acer Aspire', price: 1800 },
  { id: 3, title: 'Dell Vostro', price: 3400 },
];

let order = [];

function setCartMessage(message) {
  document.getElementById('cart-message').textContent = message;
}

function addToBasket(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  if (order.some((item) => item.id === productId)) {
    setCartMessage(`${product.title} is already in the cart.`);
    return;
  }

  order = [...order, product];
  setCartMessage(`${product.title} added to the cart.`);
  renderCart();
  renderTotal();
}

function removeFromBasket(productId) {
  order = order.filter((item) => item.id !== productId);
  setCartMessage('Item removed from the cart.');
  renderCart();
  renderTotal();
}

function renderTotal() {
  const totalPrice = order.reduce((total, item) => total + item.price, 0);
  document.getElementById('total').textContent = totalPrice;
}

function renderCart() {
  const cart = document.getElementById('basket-items');
  cart.replaceChildren();

  order.forEach((item) => {
    const listItem = document.createElement('li');
    const removeButton = document.createElement('button');

    listItem.append(document.createTextNode(item.title));
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';
    removeButton.setAttribute('aria-label', `Remove ${item.title} from cart`);
    removeButton.addEventListener('click', () => removeFromBasket(item.id));
    listItem.append(removeButton);
    cart.append(listItem);
  });
}

document.querySelectorAll('.buy-button').forEach((button) => {
  button.addEventListener('click', () => {
    addToBasket(Number(button.dataset.productId));
  });
});
