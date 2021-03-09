import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils'
import { rest } from 'msw'
import { server } from '../../../mocks/server'
import userEvent from '@testing-library/user-event'

import OrderEntry from '../OrderEntry'

test('handles errors for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res.status(500)
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res.status(500)
    )
  )

  render(<OrderEntry setOrderPhase={jest.fn()} />)

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert')
    expect(alerts).toHaveLength(2)
  })
})

test('disables order button if no toppings are selected', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />)

  const orderButton = screen.getByRole('button', {
    name: /Order Sundae!/i,
  })
  expect(orderButton).toBeDisabled()

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '1')

  expect(orderButton).toBeEnabled()

  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '0')

  expect(orderButton).toBeDisabled()

  userEvent.clear(chocolateInput)
  expect(orderButton).toBeDisabled()
})
