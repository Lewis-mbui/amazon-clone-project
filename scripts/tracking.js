import { getOrder } from "../data/orders.js";
import { loadProductsFetch, getProduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { calculateCartQuantity } from "../data/cart.js";

loadPage();

async function loadPage() {
  await loadProductsFetch();
  renderTrackingSection();
}

function renderTrackingSection() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");
  const matchingOrder = getOrder(orderId);
  const matchingProduct = getProduct(productId);

  const matchingProductFromOrder = matchingOrder.products.find((product) => {
    return product.productId === productId;
  });

  const {estimatedDeliveryTime, quantity} = matchingProductFromOrder;

  const deliveryDateString = dayjs(estimatedDeliveryTime).format(
    'dddd, MMMM D'
  );
  

  const html = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">Arriving on ${deliveryDateString}</div>

    <div class="product-info">
      ${matchingProduct.name}
    </div>

    <div class="product-info">Quantity: ${quantity}</div>

    <img
      class="product-image"
      src=${matchingProduct.image}
    />

    <div class="progress-labels-container">
      <div class="progress-label">Preparing</div>
      <div class="progress-label current-status">Shipped</div>
      <div class="progress-label">Delivered</div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking')
    .innerHTML = html;

  document.querySelector('.js-cart-quantity')
    .innerHTML = calculateCartQuantity();
}