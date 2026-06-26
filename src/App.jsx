import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/GeneralLayout';

const Painel = () => <h1 className="text-3xl font-bold">Painel</h1>;
const Calendario = () => <h1 className="text-3xl font-bold">Calendário</h1>;
const Clientes = () => <h1 className="text-3xl font-bold">Gerenciar Clientes</h1>;
const Servicos = () => <h1 className="text-3xl font-bold">Serviços Oferecidos</h1>;
const Relatorios = () => <h1 className="text-3xl font-bold">Relatórios do Sistema</h1>;
const Configuracoes = () => <h1 className="text-3xl font-bold">Configurações</h1>;

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