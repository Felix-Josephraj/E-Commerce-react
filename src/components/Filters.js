import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const { updateFilter, allProducts, filters, clearFilters } =
    useFilterContext()
  const uniqueCompanies = ['all', ...getUniqueValues(allProducts, 'company')]
  const uniqueCategories = ['all', ...getUniqueValues(allProducts, 'category')]
  const uniqueColors = ['all', ...getUniqueValues(allProducts, 'colors')]
  return (
    <Wrapper>
      <div className='content'>
        <form
          action=''
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          {/* Text search */}
          <div className='form-control'>
            <input
              type='text'
              name='text'
              placeholder='Search'
              className='search-input'
              value={filters.text}
              onChange={(e) => {
                updateFilter(e)
              }}
            />
          </div>
          {/* end of Text search */}
          {/* Category filter */}
          <div className='form-control'>
            <h5>Category</h5>
            {uniqueCategories.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`${item == filters.category && 'active'}`}
                  name='category'
                  onClick={(e) => {
                    updateFilter(e)
                  }}
                >
                  {item}
                </button>
              )
            })}
          </div>
          {/* end of Category filter*/}
          {/* Company filter */}
          <div className='form-control'>
            <h5>Company</h5>
            <select
              name='company'
              id=''
              className='company'
              value={filters.company}
              onChange={(e) => {
                updateFilter(e)
              }}
            >
              {uniqueCompanies.map((item, index) => {
                return <option key={index}>{item}</option>
              })}
            </select>
          </div>
          {/* end of Company filter */}
          {/* Colors */}
          <div className='form-control'>
            <h5>Colors</h5>
            <div className='colors'>
              {/* <button
              className={`${filters.color == 'all' && 'active'} all-btn`}
              value='all'
            >
              All
            </button> */}
              {uniqueColors.map((item, index) => {
                return (
                  <button
                    key={index}
                    value={item}
                    name='color'
                    className={`${item == filters.color && 'active'} ${
                      item !== 'all' ? 'color-btn' : 'all-btn'
                    }  `}
                    style={{ background: item !== 'all' && item }}
                    onClick={(e) => {
                      updateFilter(e)
                    }}
                  >
                    {item == filters.color && item != 'all' && <FaCheck />}
                    {item == 'all' && 'all'}
                  </button>
                )
              })}
            </div>
          </div>
          {/* End of Colors */}
          {/* Price */}
          <div className='form-control'>
            <h5>Price</h5>
            <p>{formatPrice(filters.price)}</p>
            <input
              type='range'
              onChange={updateFilter}
              min={filters.minPrice}
              max={filters.maxPrice}
              value={filters.price}
              name='price'
            />
          </div>
          {/* End of Price */}
          {/* Shipping  */}
          <div className='form-control shipping'>
            <label htmlFor='shipping'>Free Shipping</label>
            <input
              type='checkbox'
              name='shipping'
              id=''
              checked={filters.shipping}
              onChange={(e) => {
                updateFilter(e)
              }}
            />
          </div>
          {/* End of Shipping  */}
          {/* Clear filters  */}
          <div className='form-control'>
            <button
              className='clear-btn'
              onClick={() => {
                clearFilters()
              }}
            >
              Clear Filters
            </button>
          </div>
          {/* End ofClear filters  */}
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
