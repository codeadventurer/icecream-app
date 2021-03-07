import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import Options from '../Options'
import OrderEntry from '../OrderEntry'

describe('Subtotals', () => {
  test('update scoop subtotal when scoops change', async () => {
    render(<Options optionType="scoops" />)

    // make sure subtotal starts at 0.00 €

    const scoopsSubtotal = screen.getByText('Scoops total:', { exact: false })
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

    // make sure subtotal starts at 0.00 €
    const toppingsSubtotal = screen.getByText('Toppings total:', {
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
    const mAndMsCheckbox = await screen.findByRole('checkbox', {
      name: 'M&Ms',
    })
    expect(mAndMsCheckbox).not.toBeChecked()
    userEvent.click(mAndMsCheckbox)
    expect(mAndMsCheckbox).toBeChecked()
    expect(toppingsSubtotal).toHaveTextContent('3.00')

    // uncheck Cherries topping and see subtotal
    userEvent.click(mAndMsCheckbox)
    expect(mAndMsCheckbox).not.toBeChecked()
    expect(toppingsSubtotal).toHaveTextContent('1.50')
  })
})

describe('Grand total', () => {
  test('grand total updates properly if scoop option is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /Grand total:/i })

    // grand total starts at 0.00 €'
    expect(grandTotal).toHaveTextContent('0.00')

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('4.00')

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })
    userEvent.click(cherriesCheckbox)

    expect(grandTotal).toHaveTextContent('5.50')
  })

  test('grand total updates properly if topping option is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /Grand total:/i })

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })
    userEvent.click(cherriesCheckbox)

    const mAndMsCheckbox = await screen.findByRole('checkbox', {
      name: 'M&Ms',
    })
    userEvent.click(mAndMsCheckbox)
    expect(grandTotal).toHaveTextContent('3.00')

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')

    expect(grandTotal).toHaveTextContent('5.00')
  })

  test('grand total updates properly if an item is removed', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /Grand total:/i })

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })
    userEvent.click(cherriesCheckbox)

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('5.50')
    userEvent.type(vanillaInput, '1')
    expect(grandTotal).toHaveTextContent('3.50')

    userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('2.00')
  })
})
