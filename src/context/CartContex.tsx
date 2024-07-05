// CartContext.js
import React, { createContext, useReducer } from 'react';

// Define initial state
const initialState = {
 items: [],
};
type CartAction = 
  | { type: 'ADD_ITEM'; payload: any }
  | { type: 'REMOVE_ITEM'; payload: any };

  interface CartState {
    items: any[];
  }

  interface CartContextType {
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
  }

  const CartContext = React.createContext<CartContextType | undefined>(undefined);


// Define reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item !== action.payload) };
    default:
      return state;
  }
};


// Create provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};