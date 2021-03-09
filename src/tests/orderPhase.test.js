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

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  })
  userEvent.click(cherriesCheckbox)

  //find and click the order button

  const orderButton = screen.getByRole('button', { name: /Order Sundae!/i })
  userEvent.click(orderButton)

  //check summary information based on order
  expect(orderButton).not.toBeInTheDocument()

  const orderSummaryHeading = screen.getByRole('heading', {
    name: /Order summary/i,
  })
  expect(orderSummaryHeading).toBeInTheDocument()

  const scoopsSummaryHeading = screen.getByRole('heading', {
    name: /Scoops: €6.00/i,
  })
  expect(scoopsSummaryHeading).toBeInTheDocument()

  const toppingsSummaryHeading = screen.getByRole('heading', {
    name: /Toppings: €1.50/i,
  })
  expect(toppingsSummaryHeading).toBeInTheDocument()

  const totalSummaryHeading = screen.getByRole('heading', {
    name: /Total: €7.50/,
  })
  expect(totalSummaryHeading).toBeInTheDocument()

  expect(screen.getByText('3 Vanilla')).toBeInTheDocument()
  expect(screen.getByText('Cherries')).toBeInTheDocument()

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

  const loadingText = screen.getByText('Loading...')
  expect(loadingText).toBeInTheDocument()

  const thanYouHeader = await screen.findByRole('heading', {
    name: /Thank you/i,
  })
  expect(thanYouHeader).toBeInTheDocument()

  const notLoadingText = screen.queryByText('Loading...')
  expect(notLoadingText).not.toBeInTheDocument()

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

  const scoopsSubtotal = screen.getByText('Scoops total:', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  const toppingsSubtotal = screen.getByText('Toppings total:', {
    exact: false,
  })
  expect(toppingsSubtotal).toHaveTextContent('0.00')

  const grandTotal = screen.getByRole('heading', { name: /Grand total:/i })
  expect(grandTotal).toHaveTextContent('0.00')

  await screen.findByRole('spinbutton', { name: 'Vanilla' })
  await screen.findByRole('checkbox', { name: 'Cherries' })
})

test('happy path without toppings chosen', async () => {
  render(<App />)

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')

  const orderButton = screen.getByRole('button', { name: /Order Sundae!/i })
  userEvent.click(orderButton)

  const scoopsSummaryHeading = screen.getByRole('heading', {
    name: /Scoops: €4.00/i,
  })
  expect(scoopsSummaryHeading).toBeInTheDocument()

  const toppingsSummaryHeading = screen.queryByRole('heading', {
    name: /Toppings/i,
  })
  expect(toppingsSummaryHeading).not.toBeInTheDocument()

  const totalSummaryHeading = screen.getByRole('heading', {
    name: /Total: €4.00/,
  })
  expect(totalSummaryHeading).toBeInTheDocument()
})
