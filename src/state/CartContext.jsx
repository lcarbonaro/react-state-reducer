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
      let items;
      if( cart.filter(p=>p.id===action.id).length === 0) {
        items = [ ...cart, action ];
      } else {
        items = [ ...cart ];
      }
      return items;
    case 'REMOVE_PRODUCT':
      return cart.filter((p) => p.id !== action.id);
    case 'CLEAR_CART':
      return [];

    case 'INC_QTY':
      let incCart = [...cart];
      return incCart.map( function(p) {
        if(p.id === action.id) {
          // was: p.qty++
          return {...p, qty:p.qty + 1};        
        } 
        return p;
      });            

    case 'DEC_QTY':
      let decCart = [...cart];
      return decCart.map( function(p) {
        if(p.id === action.id) {
          //was: p.qty = p.qty > 1 ? p.qty - 1 : p.qty;           
          return {...p, qty:p.qty > 1 ? p.qty - 1 : p.qty };
        } 
        return p;
      });
      
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialCart = [];
