import { act } from 'react-dom/test-utils'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true }

    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false }

    case GET_PRODUCTS_BEGIN:
      return { ...state, productLoading: true }

    case GET_PRODUCTS_SUCCESS:
      const featuredProducts = action.payload.filter((product) => {
        return product.featured === true
      })

      return {
        ...state,
        productLoading: false,
        products: action.payload,
        featuredProducts,
      }

    case GET_PRODUCTS_ERROR:
      return { ...state, productError: true, productLoading: false }

    case GET_SINGLE_PRODUCT_BEGIN:
      return { ...state, singleProductLoading: true, singleProductError: false }

    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        singleProductLoading: false,
        singleProductError: false,
        singleProduct: action.payload,
      }

    case GET_SINGLE_PRODUCT_ERROR:
      return { ...state, singleProductLoading: false, singleProductError: true }
  }
  // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
