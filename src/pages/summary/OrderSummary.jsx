import SummaryForm from './SummaryForm'
import { useOrderDetails } from '../../contexts/OrderDetails'

export default function OrderSummary({ onPhaseChange, onOrderNumberFetch }) {
  const [orderDetails] = useOrderDetails()
  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <h2>Toppings: {orderDetails.totals.toppings}</h2>
      <h2>Total: {orderDetails.totals.grandTotal}</h2>
      <SummaryForm
        onPhaseChange={onPhaseChange}
        onOrderNumberFetch={onOrderNumberFetch}
      />
    </div>
  )
}
