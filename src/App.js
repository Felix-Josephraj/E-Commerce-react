import React, { Children } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {
  Home,
  About,
  Cart,
  Checkout,
  SingleProductPage,
  Error,
  ProductPage,
  PrivateRoute,
} from './pages'

function App() {
  console.log(window.location)

  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path='/' >
          <Home />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
        <PrivateRoute exact path='/checkout'>
          <Checkout />
        </PrivateRoute>
        <Route exact path='/products'>
          <ProductPage />
        </Route>
        <Route exact path='/products/:id' children={<SingleProductPage />} />
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
