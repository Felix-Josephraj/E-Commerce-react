import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { allProducts, gridView, filteredProducts } = useFilterContext()
  if (filteredProducts.length < 1)
    return (
      <div>
        <h4>Sorry no products found for your search...</h4>
      </div>
    )
  if (gridView) return <GridView products={[...filteredProducts]}></GridView>
  return <ListView products={filteredProducts}></ListView>
}

export default ProductList
