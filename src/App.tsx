import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Event } from './pages/Event';
import { EventsList } from './pages/EventsList';
import { Home } from './pages/Home';
import { Payment } from './pages/Payment';
import { Subscribe } from './pages/Subscribe';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventos" element={<EventsList />} />
        <Route path="/eventos/:slug" element={<Event />} />
        <Route path="/pagamento/:batch_id/usuario/:user_id" element={<Payment />} />
        
        {/* Esta rota não está sendo utilizada */}
        <Route path="/eventos/:slug/inscricao" element={<Subscribe />} />
      </Routes>
    </BrowserRouter>
  );
}
