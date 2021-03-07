import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import Options from '../Options'

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />)

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

test('update topping subtotal when toppings change', async () => {
  render(<Options optionType="toppings" />)

  // make sure subtotal starts at 0.00$
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  })
  expect(toppingsSubtotal).toHaveTextContent('0.00')

  // update Cherries topping to checked and see subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  })
  expect(cherriesCheckbox).not.toBeChecked()
  userEvent.click(cherriesCheckbox)
  expect(cherriesCheckbox).toBeChecked()
  expect(toppingsSubtotal).toHaveTextContent('1.50')

  // update M&Ms topping to checked and see subtotal
  const MAndMsCheckbox = await screen.findByRole('checkbox', {
    name: 'M&Ms',
  })
  expect(MAndMsCheckbox).not.toBeChecked()
  userEvent.click(MAndMsCheckbox)
  expect(MAndMsCheckbox).toBeChecked()
  expect(toppingsSubtotal).toHaveTextContent('3.00')

  // uncheck Cherries topping and see subtotal
  userEvent.click(MAndMsCheckbox)
  expect(MAndMsCheckbox).not.toBeChecked()
  expect(toppingsSubtotal).toHaveTextContent('1.50')
})
