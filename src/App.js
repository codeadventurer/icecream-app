import { useState } from 'react'
import { Container } from 'react-bootstrap'

import { OrderDetailsProvider } from './contexts/OrderDetails'
import OrderEntry from './pages/entry/OrderEntry'
import OrderSummary from './pages/summary/OrderSummary'
import OrderConfirmation from './pages/confirmation/OrderConfirmation'

const phases = {
  entry: OrderEntry,
  summary: OrderSummary,
  confirmation: OrderConfirmation,
}

function App() {
  const [orderPhase, setOrderPhase] = useState('entry')
  const [orderNumber, setOrderNumber] = useState(null)

  const handlePhaseChange = (phase) => setOrderPhase(phase)
  const handleOrderNumberFetch = (number) => setOrderNumber(number)

  const PhaseComponent = phases[orderPhase]

  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        <PhaseComponent
          onPhaseChange={handlePhaseChange}
          onOrderNumberFetch={handleOrderNumberFetch}
          orderNumber={orderNumber}
        />
      </OrderDetailsProvider>
      {/* Confirmation page does not need a provider */}
    </Container>
  )
}

export default App
