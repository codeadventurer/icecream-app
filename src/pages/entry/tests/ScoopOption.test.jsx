import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'

import ScoopOption from '../ScoopOption'

test('display inputs as invalid', () => {
  render(
    <ScoopOption name={'Chocolate'} updateItemCount={jest.fn()} imagePath="" />
  )

  const chocolateInput = screen.getByRole('spinbutton')

  expect(chocolateInput).not.toHaveClass('is-invalid')

  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '-1')

  expect(chocolateInput).toHaveClass('is-invalid')

  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '5.40')
  expect(chocolateInput).toHaveClass('is-invalid')

  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '20')
  expect(chocolateInput).toHaveClass('is-invalid')

  userEvent.clear(chocolateInput)
  expect(chocolateInput).not.toHaveClass('is-invalid')
})
