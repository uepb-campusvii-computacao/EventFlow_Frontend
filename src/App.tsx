import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Event } from './pages/Event';
import { EventsList } from './pages/EventsList';
import { Home } from './pages/Home';
import { Payment } from './pages/Payment';
import { ResetPassword } from './pages/ResetPassword';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/eventos" element={<EventsList />} />
        <Route path="/eventos/:slug" element={<Event />} />
        <Route path="/pagamentos/:slug" element={<Payment />} />
        {/* <Route path="/eventos/:slug/inscricao" element={<Subscribe />} /> */}
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
