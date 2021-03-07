import { Col, Form, Row } from 'react-bootstrap'

export default function ToppingOption({ name, imagePath, updateItemCount }) {
  const toggleChecked = (event) => {
    updateItemCount(name, +event.target.checked)
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group
        controlId={`${name}-tooping-checkbox`}
        style={{ marginTop: '10px' }}
      >
        <Form.Check type="checkbox" label={name} onChange={toggleChecked} />
      </Form.Group>
    </Col>
  )
}
