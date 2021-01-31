import { useState } from 'react';

export default function SummaryForm() {
  const [disabled, setDisabled] = useState(true);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  return (
    <div>
      <button disabled={disabled}>Confirm order</button>
      <div>
        <input
          type="checkbox"
          id="enable-submit-checkbox"
          defaultChecked={!disabled}
          onChange={toggleDisabled}
        />
        <label htmlFor="enable-submit-checkbox">
          I agree to Terms and Conditions
        </label>
      </div>
    </div>
  );
}
