import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type == LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((item) => {
      return item.price
    })
    maxPrice = Math.max(...maxPrice)
    console.log(maxPrice)
    return {
      ...state,
      filteredProducts: [...action.payload],
      allProducts: [...action.payload],
      filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice },
    }
  }
  if (action.type == SET_GRIDVIEW) {
    return { ...state, gridView: true }
  }
  if (action.type == SET_LISTVIEW) {
    return { ...state, gridView: false }
  }
  if (action.type == UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }
  if (action.type == SORT_PRODUCTS) {
    let tempProducts = [...action.products]
    if (state.filteredProducts.length > 0) {
      tempProducts = [...state.filteredProducts[0]]
    }
    if (action.payload === 'price-highest') {
      tempProducts.sort((a, b) => {
        return b.price - a.price
      })
    }
    if (action.payload === 'price-lowest') {
      tempProducts.sort((a, b) => {
        return a.price - b.price
      })
    }
    if (action.payload === 'sort-asc') {
      tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (action.payload === 'sort-des') {
      tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }
    return { ...state, filteredProducts: [...tempProducts] }
  }
  if (action.type == UPDATE_FILTERS) {
    return {
      ...state,
      filters: { ...state.filters, [action.name]: action.value },
    }
  }
  if (action.type == FILTER_PRODUCTS) {
    const {
      filters: {
        text,
        category,
        company,
        color,
        price,
        minPrice,
        maxPrice,
        shipping,
      },
      allProducts,
    } = state

    let tempProducts = [...state.allProducts]

    if (category !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.category == category
      })
    }

    if (company !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.company == company
      })
    }

    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.indexOf(color) !== -1
      })
    }
    if (text.trim().length > 0) {
      const regex = new RegExp(text + '*')
      tempProducts = tempProducts.filter((product) => {
        if (regex.test(product.name)) {
          return product
        }
      })
    }
    if (shipping === true) {
      tempProducts = tempProducts.filter((product) => {
        return product.shipping == true
      })
    }

    if (Number(price) != maxPrice) {
      tempProducts = tempProducts.filter((product) => {
        return product.price < Number(price)
      })
    }

    return {
      ...state,
      filteredProducts: [tempProducts],
    }
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        category: 'all',
        company: 'all',
        color: 'all',
        price: state.filters.maxPrice,
        shipping: false,
      },
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
