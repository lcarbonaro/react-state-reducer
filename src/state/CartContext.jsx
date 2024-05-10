import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

const CartDispatchContext = createContext(null);


export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    initialCart
  );

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}


export function useCart() {
  return useContext(CartContext);
}


export function useCartDispatch() {
  return useContext(CartDispatchContext);
}

function cartReducer(cart, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
        return [...cart, action ];
      case 'REMOVE_PRODUCT':
        return cart.filter((p) => p.id !== action.id);
      case 'CLEAR_CART':
        return [];
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialCart = [];
