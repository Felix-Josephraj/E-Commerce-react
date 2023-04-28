import React from 'react'
import styled from 'styled-components'
import {
  BsStarFill,
  BsStarHalf,
  BsStar,
  BsInfoCircleFill,
} from 'react-icons/bs'
const Stars = ({ review, stars }) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    if (Math.floor(stars) > index) return <BsStarFill key={index} />
    else if (Math.floor(stars) == index && Math.floor(stars) != stars)
      return <BsStarHalf key={index} />
    else return <BsStar key={index} />
  })

  return (
    <Wrapper>
      <span>{tempStars}</span>
      <p>({review} customer reviews)</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
