import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/GeneralLayout';
import Painel from './layouts/Painel'

const Calendario = () => <h2 className="text-3xl font-bold">Calendário</h2>;
const Clientes = () => <h2 className="text-3xl font-bold">Gerenciar Clientes</h2>;
const Servicos = () => <h2 className="text-3xl font-bold">Serviços Oferecidos</h2>;
const Relatorios = () => <h2 className="text-3xl font-bold">Relatórios do Sistema</h2>;
const Configuracoes = () => <h2 className="text-3xl font-bold">Configurações</h2>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          
          <Route index element={<Painel />} />
          
          <Route path="calendario" element={<Calendario />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="servicos" element={<Servicos />} />
          <Route path="relatorios" element={<Relatorios />} />
          <Route path="configuracoes" element={<Configuracoes />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}