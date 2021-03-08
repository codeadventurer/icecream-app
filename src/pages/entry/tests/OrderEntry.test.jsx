import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils'
import { rest } from 'msw'
import { server } from '../../../mocks/server'

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
