import { orders} from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import { formatDateString } from "./utils/date.js";
import {loadProductsFetch, getProduct } from "../data/products.js";
import { addToCart, calculateCartQuantity } from "../data/cart.js";

loadPage();

async function loadPage () {
  await loadProductsFetch();
  renderOrdersGrid();
}


function renderOrdersGrid() {
  function productsHTML(order) {
    let productsHTML = '';

    order.products.forEach((product) => {
      const {productId, quantity} = product;
      const matchingItem = getProduct(productId);

      const deliveryDate = new Date(product.estimatedDeliveryTime);
      const deliveryDateString = formatDateString(deliveryDate);

      productsHTML += `
        <div class="product-image-container">
          <img src="${matchingItem.image}" />
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-delivery-date">Arriving on: ${deliveryDateString}</div>
          <div class="product-quantity">Quantity: ${quantity}</div>

          <button class="buy-again-button 
            button-primary js-buy-button"
            data-product-id="${productId}"
          >
            <img class="buy-again-icon" src="images/icons/buy-again.png" />
            <span class="buy-again-message">Buy it again</span>
          </button>


        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    return productsHTML;
  }


  let ordersHTML = '';

  orders.forEach((order) => {
    const orderDate = new Date(order.orderTime);
    const orderDateString = formatDateString(orderDate);

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDateString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsHTML(order)}
        </div>
      </div>
    `;
  });

  // console.log(ordersHTML);

  document.querySelector('.js-orders-grid')
    .innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const {productId} = button.dataset;

        addToCart(productId, 1);

        document.querySelector('.js-cart-quantity')
          .innerHTML = calculateCartQuantity();
      });
    })
}
