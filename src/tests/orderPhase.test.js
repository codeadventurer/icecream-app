import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

test('order phases for happy path', async () => {
  // render app
  render(<App />)

  // add icecream scoops and toppings

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '3')

  const scoopsSubtotal = screen.getByText('Scoops total:', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('6.00')

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  })
  userEvent.click(cherriesCheckbox)

  const toppingsSubtotal = screen.getByText('Toppings total:', {
    exact: false,
  })
  expect(toppingsSubtotal).toHaveTextContent('1.50')

  const grandTotal = screen.getByRole('heading', { name: /Grand total:/i })
  expect(grandTotal).toHaveTextContent('7.50')

  //find and click the order button

  const orderButton = screen.getByRole('button', { name: /Order Sundae!/i })
  userEvent.click(orderButton)

  //check summary information based on order
  expect(orderButton).not.toBeInTheDocument()

  const orderSummaryHeading = screen.getByRole('heading', {
    name: /Order summary/i,
  })
  expect(orderSummaryHeading).toBeInTheDocument()

  const scoopsSummaryHeading = screen.getByRole('heading', { name: /Scoops:/ })
  expect(scoopsSummaryHeading).toHaveTextContent('6.00')

  const toppingsSummaryHeading = screen.getByRole('heading', {
    name: /Toppings:/,
  })
  expect(toppingsSummaryHeading).toHaveTextContent('1.50')

  const totalSummaryHeading = screen.getByRole('heading', {
    name: /Total:/,
  })
  expect(totalSummaryHeading).toHaveTextContent('7.50')

  //accept term and conditions and click the button to confirm the order

  const confirmButton = screen.getByRole('button', {
    name: /confirm order/i,
  })
  const termsCheckbox = screen.getByRole('checkbox', { name: /I agree/i })

  expect(confirmButton).toBeDisabled()
  expect(termsCheckbox).not.toBeChecked()

  userEvent.click(termsCheckbox)
  expect(confirmButton).toBeEnabled()

  userEvent.click(confirmButton)

  //confirm order number on confirmation page

  expect(confirmButton).not.toBeInTheDocument()

  const orderNumberText = await screen.findByText('Your order number is', {
    exact: false,
  })
  expect(orderNumberText).toHaveTextContent('123456')

  //click new order button on confirmation page

  const newOrderButton = screen.getByRole('button', {
    name: /Create new order/i,
  })
  userEvent.click(newOrderButton)

  //check that scoops and toppings total have been reset
  expect(newOrderButton).not.toBeInTheDocument()

  expect(scoopsSubtotal).toHaveTextContent('0.00')
  expect(toppingsSubtotal).toHaveTextContent('0.00')
  expect(grandTotal).toHaveTextContent('0.00')
})
