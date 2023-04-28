import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const localCart = JSON.parse(localStorage.getItem('cartDetails'))

const initialState = {
  cart: [],
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 534,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    console.log([...state.cart])
    localStorage.setItem('cartDetails', JSON.stringify(state.cart))
    dispatch({ type: COUNT_CART_TOTALS })
  }, [state.cart])

  const addToCart = (id, name, color, amount, image, price, max) => {
    console.log(id, name, color, amount, image, price, max)
    dispatch({
      type: ADD_TO_CART,
      payload: { id, name, color, amount, image, price, max },
    })
  }

  const increaseItem = (id, amount) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: id, amount })
  }

  const decreaseItem = (id, amount) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: id, amount })
  }

  const deleteItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  }

  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        increaseItem,
        decreaseItem,
        deleteItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
