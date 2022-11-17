// __tests__/index.test.jsx

import { render, screen } from '@testing-library/react'
import Blog from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Blog feed={[]} />)

    const heading = screen.getByRole('heading', {
      name: /FAMOUS BLOG\.ts!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})