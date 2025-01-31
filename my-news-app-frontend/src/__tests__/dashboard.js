import {render as rtlRender, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import App from '../App'


// Ok, so here's what your tests might look like

// this is a handy function that I would utilize for any component
// that relies on the router being in context
const render = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return {
    user: userEvent.setup(),
    ...rtlRender(ui),
  }
}

test('full app rendering/navigating', async () => {
  const {user} = render(<App />)
  expect(screen.getByTestId('card-id')).toBeInTheDocument()

  // await user.click(screen.getByText(/about/i))

  // expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
})

test('landing on a bad page', () => {
  render(<App />, {route: '/something-that-does-not-match'})

  // expect(screen.getByText(/no match/i)).toBeInTheDocument()
})
