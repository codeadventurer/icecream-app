import Options from './Options'
import { useOrderDetails } from '../../contexts/OrderDetails'

export default function OrderEntry({ onPhaseChange }) {
  const [orderDetails] = useOrderDetails()

  const isDisabled =
    orderDetails.totals.scoops === '€0.00' ||
    parseInt(orderDetails.totals.scoops) < 1

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <button onClick={() => onPhaseChange('summary')} disabled={isDisabled}>
        Order Sundae!
      </button>
    </div>
  )
}
