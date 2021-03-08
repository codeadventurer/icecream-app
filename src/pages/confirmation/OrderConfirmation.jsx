import { useState, useEffect } from 'react'
import axios from 'axios'
import { useOrderDetails } from '../../contexts/OrderDetails'
import { Button } from 'react-bootstrap'

export default function OrderConfirmation({ onPhaseChange }) {
  const [orderNumber, setOrderNumber] = useState(null)
  const [, , resetOrder] = useOrderDetails()

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => console.log(error))
  })

  const handleClick = () => {
    onPhaseChange('entry')
    resetOrder()
  }

  if (orderNumber) {
    return (
      <div>
        <h1>Thank you!</h1>
        <h2>Your order number is {orderNumber}</h2>
        <p>as per our terms and conditions, nothing will happen now</p>
        <Button variant="primary" onClick={handleClick}>
          Create new order
        </Button>
      </div>
    )
  }
  return <p>Loading...</p>
}
