export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100)
}

export const getUniqueValues = (products, unique) => {
  let uniqueProducts = products.map((item) => {
    return item[unique]
  })

  if (unique === 'colors') uniqueProducts = uniqueProducts.flat()

  return new Set(uniqueProducts)
}
