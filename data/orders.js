export const orders = JSON.parse(localStorage.getItem('orders')) || [
  {
    id: "aab0430f-139a-4709-8662-e40e839ad697",
    orderTime: "2025-10-25T12:26:13.771Z",
    totalCostCents: 5251,
    products: [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        estimatedDeliveryTime: "2025-11-01T12:26:13.771Z",
        variation: null
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        estimatedDeliveryTime: "2025-10-28T12:26:13.771Z",
        variation: null
      }
    ]
  }
];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}