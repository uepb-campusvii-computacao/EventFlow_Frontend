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
        <Route path="/eventos/:slug/inscricao" element={<Subscribe />} />
        <Route path="/pagamento/:id" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}
