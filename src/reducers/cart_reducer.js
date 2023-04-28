import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    console.log(action.payload)
    const { id, color, amount } = action.payload
    //Check if item already exists
    const alreadyPresent = state.cart.find((product) => {
      return product.id === id + color
    })
    let updatedCart = [...state.cart]
    if (alreadyPresent) {
      updatedCart = state.cart.map((product) => {
        return product.id === id + color
          ? {
              ...product,
              amount:
                product.amount + amount > product.max
                  ? product.max
                  : product.amount + amount,
            }
          : product
      })
      console.log(alreadyPresent)
    } else {
      const newItem = { ...action.payload, id: id + color }
      updatedCart = [...state.cart, newItem]
    }

    const { totalItems, totalAmount } = updatedCart.reduce(
      (acc, item) => {
        acc.totalItems += item.amount
        acc.totalAmount += item.amount * item.price
        return acc
      },
      {
        totalItems: 0,
        totalAmount: 0,
      }
    )
    console.log(totalItems)

    return { ...state, cart: updatedCart, totalItems, totalAmount }
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const updatedCart = state.cart.map((item) => {
      return item.id === action.payload
        ? { ...item, amount: action.amount }
        : item
    })
    const { totalItems, totalAmount } = updatedCart.reduce(
      (acc, item) => {
        acc.totalItems += item.amount
        acc.totalAmount += item.price * item.amount
        return acc
      },
      {
        totalItems: 0,
        totalAmount: 0,
      }
    )

    return { ...state, cart: updatedCart, totalAmount, totalItems }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const updatedCart = state.cart.filter((item) => {
      return item.id !== action.payload
    })

    const { totalItems, totalAmount } = updatedCart.reduce(
      (acc, item) => {
        acc.totalItems += item.amount
        acc.totalAmount += item.price * item.amount
        return acc
      },
      {
        totalItems: 0,
        totalAmount: 0,
      }
    )

    return { ...state, cart: updatedCart, totalAmount, totalItems }
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [], totalItems: 0 }
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { totalItems, totalAmount } = state.cart.reduce(
      (acc, item) => {
        acc.totalItems += item.amount
        acc.totalAmount += item.price * item.amount
        return acc
      },
      {
        totalItems: 0,
        totalAmount: 0,
      }
    )

    return { ...state, totalAmount, totalItems }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
