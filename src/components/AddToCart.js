import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({ product }) => {
  const { colors, stock, id, name, images, price } = product
  const [color, setColor] = useState(colors[0])
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCartContext()

  const increase = () => {
    if (quantity < stock) {
      setQuantity((prevValue) => {
        return prevValue + 1
      })
    }
  }
  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prevValue) => {
        return prevValue - 1
      })
    }
  }

  return (
    <Wrapper>
      <div className='colors'>
        <span>Colors: </span>
        <div>
          {colors.map((item, index) => {
            return (
              <button
                className={`color-btn ${item == color && 'active'}`}
                style={{ background: item }}
                key={index}
                onClick={() => {
                  setColor(item)
                }}
              >
                {item == color && <FaCheck />}
              </button>
            )
          })}
        </div>
      </div>
      <div className='btn-container'>
        <AmountButtons
          quantity={quantity}
          increase={increase}
          decrease={decrease}
        />
        <Link to={'/cart'}>
          <button
            className='btn'
            onClick={() => {
              addToCart(id, name, color, quantity, images[0].url, price, stock)
            }}
          >
            ADD TO CART
          </button>
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
