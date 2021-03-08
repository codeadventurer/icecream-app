import Options from './Options'
import { useOrderDetails } from '../../contexts/OrderDetails'

export default function OrderEntry({ onPhaseChange }) {
  const [orderDetails] = useOrderDetails()

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <button onClick={() => onPhaseChange('summary')}>Order Sundae!</button>
    </div>
  )
}
