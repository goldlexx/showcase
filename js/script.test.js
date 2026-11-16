const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');

function createElement() {
  return {
    children: [],
    dataset: {},
    addEventListener(_event, handler) { this.onClick = handler; },
    append(...nodes) { this.children.push(...nodes); },
    replaceChildren(...nodes) { this.children = nodes; },
    setAttribute() {},
    click() { this.onClick(); },
  };
}

function loadCart() {
  const elements = {
    '#basket-items': createElement(),
    '#cart-message': createElement(),
    '#total': createElement(),
  };
  const buttons = [1, 2, 3].map((id) => {
    const button = createElement();
    button.dataset.productId = String(id);
    return button;
  });
  const document = {
    getElementById: (id) => elements[`#${id}`],
    createElement,
    createTextNode: (text) => ({ textContent: text }),
    querySelectorAll: () => buttons,
  };

  vm.runInNewContext(source, { document, Number });
  return { elements, buttons };
}

test('adds products, prevents duplicates, and recalculates the total', () => {
  const { elements, buttons } = loadCart();

  buttons[0].click();
  buttons[1].click();
  buttons[0].click();

  assert.equal(elements['#basket-items'].children.length, 2);
  assert.equal(elements['#total'].textContent, 4800);
  assert.match(elements['#cart-message'].textContent, /already in the cart/);
});

test('removes a product using its dedicated button', () => {
  const { elements, buttons } = loadCart();

  buttons[0].click();
  buttons[1].click();
  elements['#basket-items'].children[0].children[1].click();

  assert.equal(elements['#basket-items'].children.length, 1);
  assert.equal(elements['#total'].textContent, 1800);
});
