import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: false,
  sort: 'price-highest',
  filterApplied: false,
  filters: {
    text: '',
    category: 'all',
    company: 'all',
    color: 'all',
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const {
    state: { products },
  } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  const updateSort = (event) => {
    const sortValue = event.target.value
    dispatch({ type: UPDATE_SORT, payload: sortValue })
  }

  const updateFilter = (event) => {
    var value
    const name = event.target.name
    if (name === 'category') value = event.target.textContent
    else if (name === 'company')
      value = event.target[event.target.selectedIndex].text
    else if (name === 'shipping') value = event.target.checked
    else value = event.target.value
    dispatch({ type: UPDATE_FILTERS, name, value })
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS, payload: state.sort, products: products })
  }, [products, state.sort, state.filters])
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilter,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
