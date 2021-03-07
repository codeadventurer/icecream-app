import { Container } from 'react-bootstrap'

import { OrderDetailsProvider } from './contexts/OrderDetails'
import OrderEntry from './pages/entry/OrderEntry'
//import SummaryForm from './pages/summary/SummaryForm';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* Confirmation page does not need a provider */}
    </Container>
  )
}

export default App
