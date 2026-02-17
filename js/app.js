const PRODUCTS = [
  { id: "p1", title: "Наушники", price: 2990 },
  { id: "p2", title: "Клавиатура", price: 4490 },
  { id: "p3", title: "Мышь", price: 1990 },
  { id: "p4", title: "Монитор", price: 17990 },
  { id: "p5", title: "Флешка 64GB", price: 790 },
  { id: "p6", title: "Коврик для мыши", price: 490 }
];

const productGrid = document.getElementById("productGrid");
const cartItemsEl = document.getElementById("cartItems");
const cartCountEl = document.getElementById("cartCount");
const cartTotalEl = document.getElementById("cartTotal");
const cartTotalBottomEl = document.getElementById("cartTotalBottom");

let cart = {};

function renderProducts() {
  productGrid.innerHTML = "";

  for (const p of PRODUCTS) {
    const card = document.createElement("article");
    card.className = "card";
    
    card.innerHTML = `
      <div class="card__img" aria-hidden="true"></div>
      <div class="card__title">${escapeHtml(p.title)}</div>
      <div class="card__price">${p.price} ₽</div>
      <div class="card__actions">
        <button class="btn btn--primary" data-add="${p.id}">
          Добавить в корзину
        </button>
      </div>
    `;

    productGrid.appendChild(card);
  }
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  if (!cart[productId]) {
    cart[productId] = { ...product, qty: 1 };
  } else {
    cart[productId].qty += 1;
  }

  renderCart();
}

function removeFromCart(productId) {
  delete cart[productId];
  renderCart();
}

function changeQty(productId, delta) {
  if (!cart[productId]) return;

  cart[productId].qty += delta;

  // если стало 0 или меньше — удаляем позицию
  if (cart[productId].qty <= 0) {
    delete cart[productId];
  }

  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = "";

  const items = Object.values(cart);

  if (items.length === 0) {
    cartItemsEl.innerHTML = "<p>Корзина пустая</p>";
    updateSummary();
    return;
  }

  for (const item of items) {
    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <div>
        <div class="cart-item__title">${escapeHtml(item.title)}</div>
        <div>${item.price} ₽ / шт</div>
      </div>

      <div class="cart-item__controls">
      <button class="qty-btn" data-dec="${item.id}" aria-label="Уменьшить">−</button>
        <b>${item.qty}</b>
        <button class="qty-btn" data-inc="${item.id}" aria-label="Увеличить">+</button>
        <button class="remove-btn" data-remove="${item.id}">Удалить</button>
      </div>
    `;

    cartItemsEl.appendChild(row);
  }

  updateSummary();
}

function updateSummary() {
  const items = Object.values(cart);

  let count = 0;
  let total = 0;

  for (const item of items) {
    count += item.qty;
    total += item.qty * item.price;
  }

  cartCountEl.textContent = String(count);
  cartTotalEl.textContent = String(total);
  cartTotalBottomEl.textContent = String(total);
}

productGrid.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-add]");
  if (!btn) return;

  addToCart(btn.dataset.add);
});

cartItemsEl.addEventListener("click", (e) => {
  const inc = e.target.closest("button[data-inc]");
  const dec = e.target.closest("button[data-dec]");
  const btn = e.target.closest("button[data-remove]");
  if (inc) changeQty(inc.dataset.inc, +1);
  if (dec) changeQty(dec.dataset.dec, -1);
  if (btn) removeFromCart(btn.dataset.remove);
});


function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

renderProducts();
renderCart();