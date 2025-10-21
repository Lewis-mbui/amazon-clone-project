import { addToCart, cart, loadFromStorage, removeFromCart, updateCartQuantity, updateDeliveryOption } from "../../data/cart.js";

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(Storage.prototype, 'setItem');
  });

  it('adds an existing product to the cart', () => {
    spyOn(Storage.prototype, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();
    
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }
    ]));
  });

  it('adds a new product to the cart', () => {
    spyOn(Storage.prototype, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }
    ]));
  });
});

describe('test suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(Storage.prototype, 'setItem');

    spyOn(Storage.prototype ,'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: '2'
        }
      ]);
    });
  });

  it('removes a product in the cart', () => {
    loadFromStorage();

    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).not.toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  });

  it ('does nothing if product is not in the cart', () => {
    loadFromStorage();

    removeFromCart('3ebe75dc-64d2-4137-8860-1f5a963e534b');

    expect(cart.length).toEqual(2);
  });
});

describe('test suite: updateDeliveryOption', () => {
  beforeEach(() => {
    spyOn(Storage.prototype, 'setItem');

    spyOn(Storage.prototype ,'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: '2'
        }
      ]);
    });

    loadFromStorage();
  });

  it('updates the delivery option for a product', () => {
    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');

    expect(cart.length).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('3');
  })
});