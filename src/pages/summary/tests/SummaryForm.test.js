import { render, fireEvent, screen } from '@testing-library/react';

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

    fireEvent.click(checkbox);

    expect(confirmButton).toBeEnabled();
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    expect(confirmButton).toBeDisabled();
    expect(checkbox).not.toBeChecked();
  });
});
