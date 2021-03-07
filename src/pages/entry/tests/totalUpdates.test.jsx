import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Options from '../Options'
import { OrderDetailsProvider } from '../../../contexts/OrderDetails'

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider })

  // make sure subtotal starts at 0.00$

  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  // update vanilla scoop to one and check subtotal

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')
  expect(scoopsSubtotal).toHaveTextContent('2.00')

  // update chocolate scoop to two and check subtotal

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('6.00')
})
