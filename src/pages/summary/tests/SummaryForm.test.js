import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from '../SummaryForm';

describe('SummaryForm', () => {
  test('initial conditions', () => {
    render(<SummaryForm />);
    const confirmButton = screen.getByRole('button', {
      name: /confirm order/i,
    });
    const checkbox = screen.getByRole('checkbox', { name: /I agree/i });

    expect(confirmButton).toBeDisabled();
    expect(checkbox).not.toBeChecked();
  });

  test('button is enabled when checkbox id checked and disabled when checked again', () => {
    render(<SummaryForm />);
    const confirmButton = screen.getByRole('button', {
      name: /confirm order/i,
    });
    const checkbox = screen.getByRole('checkbox', { name: /I agree/i });

    userEvent.click(checkbox);

    expect(confirmButton).toBeEnabled();
    expect(checkbox).toBeChecked();

    userEvent.click(checkbox);

    expect(confirmButton).toBeDisabled();
    expect(checkbox).not.toBeChecked();
  });

  test('popover responses to hover', async () => {
    render(<SummaryForm />);

    const nullPopover = screen.queryByText(
      /no icecream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);
    const popover = screen.getByText(/no icecream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no icecream will actually be delivered/i)
    );
  });
});
