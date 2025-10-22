function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) ||
        [{
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: '1'
        },{
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: '2'
        }];
    },

    saveCartToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    calculateCartQuantity() {
      let cartQuantity = 0;

      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });

      return cartQuantity;
    },

    addToCart(productId, quantity) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        this.cartItems.push({
          productId,
          quantity,
          deliveryOptionId: '1'
        });
      }

      this.saveCartToStorage();
    },

    removeFromCart(productId) {
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId !== productId)
          newCart.push(cartItem);
      });

      this.cartItems = newCart;

      this.saveCartToStorage();
    },

    updateCartQuantity(productId, newQuantity) {
      const matchingItem = this.cartItems.find((cartItem) => {
          return cartItem.productId === productId;
      });

      matchingItem.quantity = newQuantity;
      this.saveCartToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (!matchingItem) return;
      
      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveCartToStorage();
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
