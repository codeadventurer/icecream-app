import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  const [isValid, setIsValid] = useState(true)
  const handleChange = (event) => {
    const currentValueFloat = parseFloat(event.target.value)
    const valid =
      event.target.value === '' ||
      (currentValueFloat >= 0 &&
        currentValueFloat < 10 &&
        Math.floor(currentValueFloat) === currentValueFloat)

    setIsValid(valid)
    if (valid) updateItemCount(name, event.target.value || 0)
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control
            type="number"
            name={name}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  )
}
