import SummaryForm from './SummaryForm'
import { useOrderDetails } from '../../contexts/OrderDetails'

export default function OrderSummary({ onPhaseChange }) {
  const [orderDetails] = useOrderDetails()

  const scoopArray = [...orderDetails.scoops.entries()]
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ))

  const toppingsArray = [...orderDetails.toppings.keys()]
  const toppingsList = toppingsArray.map((key) => <li key={key}>{key}</li>)

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {orderDetails.toppings.size > 0 && (
        <>
          <h2>Toppings: {orderDetails.totals.toppings}</h2>
          <ul>{toppingsList}</ul>
        </>
      )}
      <h2>Total: {orderDetails.totals.grandTotal}</h2>
      <SummaryForm onPhaseChange={onPhaseChange} />
    </div>
  )
}
