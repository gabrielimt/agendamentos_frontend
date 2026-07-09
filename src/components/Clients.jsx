import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, FileText, X, AlertCircle } from 'lucide-react';

export default function Clients() {
  // Estado inicial com os campos solicitados
  const [patients] = useState([
    {
      id: 1,
      name: 'Ana Carolina Silva',
      cpf: '111.222.333-44',
      birthDate: '15/04/1990',
      gender: 'Feminino',
      phone: '(51) 98765-4321',
      lastVisit: '15/06/2026',
      nextVisit: '10/07/2026',
    },
    {
      id: 2,
      name: 'Carlos Eduardo Mendes',
      cpf: '222.333.444-55',
      birthDate: '22/11/1985',
      gender: 'Masculino',
      phone: '(51) 99123-4567',
      lastVisit: '02/07/2026',
      nextVisit: 'A agendar',
    },
    {
      id: 3,
      name: 'Mariana Souza',
      cpf: '333.444.555-66',
      birthDate: '08/01/1995',
      gender: 'Feminino',
      phone: '(51) 99888-7777',
      lastVisit: '28/05/2026',
      nextVisit: '12/07/2026',
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ type: null, patient: null });

  const openModal = (type, patient) => {
    setModalConfig({ type, patient });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalConfig({ type: null, patient: null });
  };

  const renderModalContent = () => {
    const { type, patient } = modalConfig;
    if (!patient) return null;

    switch (type) {
      case 'prontuario':
        return (
          <div className="w-full">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Prontuário Médico</h2>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6 space-y-4">
              <div>
                <p className="text-sm text-slate-500">Paciente</p>
                <p className="font-bold text-slate-800">{patient.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">CPF</p>
                  <p className="font-medium text-slate-800">{patient.cpf}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Data de Nasc.</p>
                  <p className="font-medium text-slate-800">{patient.birthDate}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Gênero</p>
                  <p className="font-medium text-slate-800">{patient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Telefone</p>
                  <p className="font-medium text-slate-800">{patient.phone}</p>
                </div>
              </div>
            </div>
            <button onClick={closeModal} className="w-full py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors">Fechar</button>
          </div>
        );
      case 'edit':
        return (
          <div className="w-full">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Editar Paciente</h2>
            <div className="space-y-4 mb-6">
              <input type="text" defaultValue={patient.name} className="w-full p-2 border border-slate-200 rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" defaultValue={patient.cpf} className="p-2 border border-slate-200 rounded-lg" />
                <input type="text" defaultValue={patient.birthDate} className="p-2 border border-slate-200 rounded-lg" />
              </div>
            </div>
            <button className="w-full py-2 bg-[#6BB0C1] text-white rounded-lg font-medium">Salvar</button>
          </div>
        );
      case 'delete':
        return (
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-600 mb-4" />
            <h2 className="text-xl font-bold mb-2">Excluir Paciente</h2>
            <p className="text-slate-500 mb-6">Tem certeza que deseja excluir {patient.name}?</p>
            <button onClick={closeModal} className="w-full py-2 bg-red-600 text-white rounded-lg font-medium">Confirmar Exclusão</button>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex-1 min-w-0 p-8 bg-slate-50 min-h-screen relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gerenciar Clientes</h1>
          <p className="text-slate-500 text-sm">Visualize e gerencie os pacientes.</p>
        </div>
        <button className="bg-[#6BB0C1] text-white px-4 py-2 rounded-lg font-medium shadow-sm flex items-center gap-2">
          <Plus size={20} /> Novo Paciente
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input type="text" placeholder="Buscar..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg" />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
            <tr>
              <th className="p-4">Nome / CPF</th>
              <th className="p-4">Contato</th>
              <th className="p-4">Última Consulta</th>
              <th className="p-4">Próxima</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {patients.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <div className="font-medium text-slate-800">{p.name}</div>
                  <div className="text-xs text-slate-400">CPF: {p.cpf}</div>
                </td>
                <td className="p-4 text-sm text-slate-600">{p.phone}</td>
                <td className="p-4 text-sm text-slate-600">{p.lastVisit}</td>
                <td className="p-4 text-sm font-medium">{p.nextVisit}</td>
                <td className="p-4 flex justify-center gap-2">
                  <button onClick={() => openModal('prontuario', p)} className="p-2 text-slate-400 hover:text-[#6BB0C1]"><FileText size={18} /></button>
                  <button onClick={() => openModal('edit', p)} className="p-2 text-slate-400 hover:text-slate-800"><Edit size={18} /></button>
                  <button onClick={() => openModal('delete', p)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div onClick={closeModal} className="absolute inset-0"></div>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative z-10">
            <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400"><X size={20} /></button>
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
}