import { useState } from 'react'
import axios from 'axios'
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap'

export default function SummaryForm({ onPhaseChange, onOrderNumberFetch }) {
  const [disabled, setDisabled] = useState(true)

  const toggleDisabled = () => {
    setDisabled(!disabled)
  }

  const handleSubmit = () => {
    axios
      .post('http://localhost:3030/order')
      .then((response) => onOrderNumberFetch(response.data.orderNumber))
      .then(onPhaseChange('confirmation'))
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>No icecream will actually be delivered</Popover.Content>
    </Popover>
  )

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
  )

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
      <Button
        variant="primary"
        type="submit"
        disabled={disabled}
        onClick={handleSubmit}
      >
        Confirm order
      </Button>
    </Form>
  )
}
