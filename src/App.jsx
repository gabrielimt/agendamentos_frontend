import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GeneralLayout from './components/GeneralLayout'
import Painel from './components/Painel'
import Calendary from './components/Calendary'

const Clientes = () => <h2 className="text-3xl font-bold">Gerenciar Clientes</h2>;
const Servicos = () => <h2 className="text-3xl font-bold">Serviços Oferecidos</h2>;
const Relatorios = () => <h2 className="text-3xl font-bold">Relatórios do Sistema</h2>;
const Configuracoes = () => <h2 className="text-3xl font-bold">Configurações</h2>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GeneralLayout />}>
          
          <Route index element={<Painel />} />
          
          <Route path="calendario" element={<Calendary />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="servicos" element={<Servicos />} />
          <Route path="relatorios" element={<Relatorios />} />
          <Route path="configuracoes" element={<Configuracoes />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}