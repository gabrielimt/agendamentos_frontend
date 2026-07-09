import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GeneralLayout from './components/GeneralLayout'
import Painel from './components/Painel'
import Calendary from './components/Calendary'
import Services from './components/Services'
import Clients from './components/Clients'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GeneralLayout />}>
          
          <Route index element={<Painel />} />
          
          <Route path="calendario" element={<Calendary />} />
          <Route path="servicos" element={<Services />} />
          <Route path="clientes" element={<Clients />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}