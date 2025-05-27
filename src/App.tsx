import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Event } from './events/pages/Event';
import { EventsList } from './events/pages/EventsList';
import { Home } from './Home';
import { Payment } from './payments/pages/Payment';
import { ResetPassword } from './auth/pages/ResetPassword';
import { SignIn } from './auth/pages/SignIn';
import { SignUp } from './signup/pages/SignUp';
import UpdatePayment from './payments/pages/UpdatePayment';
import { AuthProvider } from './auth/hooks/contextAuth';

export default function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/eventos" element={<EventsList />} />
        <Route path="/eventos/:slug" element={<Event />} />
        <Route path="/pagamentos/:slug" element={<Payment />} />
        <Route path="/pagamentos/:slug/atualizar" element={<UpdatePayment />} />
        {/* <Route path="/eventos/:slug/inscricao" element={<Subscribe />} /> */}
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}
