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

  const handlePhaseChange = (phase) => setOrderPhase(phase)

  const PhaseComponent = phases[orderPhase]

  return (
    <Container>
      <OrderDetailsProvider>
        <PhaseComponent onPhaseChange={handlePhaseChange} />
      </OrderDetailsProvider>
    </Container>
  )
}

export default App
