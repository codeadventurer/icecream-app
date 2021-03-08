import { useOrderDetails } from '../../contexts/OrderDetails'

export default function OrderConfirmation({ onPhaseChange, orderNumber }) {
  const [, , resetTotals] = useOrderDetails()

  const handleClick = () => {
    onPhaseChange('entry')
    resetTotals()
  }

  return (
    <div>
      <h1>Thank you!</h1>
      <h2>Your order number is {orderNumber}</h2>
      <p>as per our terms and conditions, nothing will happen now</p>
      <button onClick={handleClick}>Create new order</button>
    </div>
  )
}
