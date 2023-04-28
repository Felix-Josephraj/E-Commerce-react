import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return (
    <main>
      <PageHero title='About' />
      <Wrapper className='section section-center'>
        <img src={aboutImg} alt='' />
        <div className='title'>
          <h1>Our Story</h1>
          <h1 className='underline'></h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam modi,
            corporis obcaecati vitae quis quaerat minima doloribus, porro
            dolorem odio voluptatem culpa quod totam aliquam sequi error illum
            sapiente qui! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Nobis accusamus dolor explicabo possimus reprehenderit a illum
            quisquam beatae quod perferendis voluptate aliquid nulla asperiores
            quo, dolores ratione veritatis ipsum similique deleniti modi
            reiciendis consequuntur voluptatum cumque laboriosam! In corrupti,
            rerum consequuntur, omnis, accusamus perspiciatis impedit beatae
            explicabo facilis distinctio similique.
          </p>
        </div>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
