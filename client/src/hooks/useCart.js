import { useState, createContext, useContext } from "react";

export const CartContext = createContext();

export function useCartState() {
  const [cart, updateCart] = useState({});

  const addToCart = (item) => {
    const current = Object.assign({}, cart);
    const payload = Object.assign({}, item)

    if (!current[payload._id]) {
      if (!payload.quantity) {
        payload.quantity = 0;
      }

      current[payload._id] = payload;
    }

    if (!payload.quantity) {
      ++current[payload._id].quantity;
    }
    

    updateCart(current);
  };

  const totalItems = Object.values(cart).reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);

  const items = Object.values(cart)

  const addQuantity = (payload) => {
    const current = Object.assign({}, cart);

    if (current[payload._id]) {
        ++current[payload._id].quantity;

        updateCart(current);
    }
  }

  const removeQuantity = (payload) => {
    const current = Object.assign({}, cart);

    if (current[payload._id] && current[payload._id].quantity > 1) {
        --current[payload._id].quantity;

        updateCart(current);
    }
  }

  const subTotal = Object.values(cart).reduce((accumulator, { price, quantity }) => {
    return accumulator + ( price * quantity );
  }, 0);

  const itemsCheckout = Object.values(cart).map((item) => {
    return {
        title: item.title,
        unit_price: item.price,
        quantity: item.quantity,
    };
  });

  const deleteItem = (payload) => {
    const current = Object.assign({}, cart);

    if (current[payload._id]) {
      delete current[payload._id]

      updateCart(current);
    }
  }

  return {
    cart,
    addToCart,
    totalItems,
    items,
    addQuantity,
    removeQuantity,
    subTotal,
    itemsCheckout,
    deleteItem
  };
}

export function useCart() {
  const cart = useContext(CartContext);

  return cart;
}
