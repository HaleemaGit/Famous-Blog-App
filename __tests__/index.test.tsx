// __tests__/index.test.jsx

import { render, screen } from '@testing-library/react'
import Blog from '../pages/index'
import '@testing-library/jest-dom'
import { SessionProvider } from 'next-auth/react';

describe('Home', () => {
  it('renders a heading', () => {
    render(<SessionProvider session={null} ><Blog feed={[]} /></SessionProvider>)

    // const heading = screen.getByRole('heading', {
    //   name: /FAMOUS BLOG\.ts!/i,
    // })

    // expect(heading).toBeInTheDocument()
  })
})