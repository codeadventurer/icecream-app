import { useState } from 'react';
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap';

export default function SummaryForm() {
  const [disabled, setDisabled] = useState(true);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>No icecream will actually be delivered</Popover.Content>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to{' '}
      <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="right"
        overlay={popover}
      >
        <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={!disabled}
          onChange={toggleDisabled}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={disabled}>
        Confirm order
      </Button>
    </Form>
  );
}
