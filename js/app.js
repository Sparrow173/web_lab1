const PRODUCTS = [
  { id: "p1", title: "Наушники", price: 2990 },
  { id: "p2", title: "Клавиатура", price: 4490 },
  { id: "p3", title: "Мышь", price: 1990 },
  { id: "p4", title: "Монитор", price: 17990 },
  { id: "p5", title: "Флешка 64GB", price: 790 },
  { id: "p6", title: "Коврик для мыши", price: 490 }
];

const productGrid = document.getElementById("productGrid");

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

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

renderProducts();