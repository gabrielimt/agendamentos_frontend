import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, FileText, X, AlertCircle } from 'lucide-react';

export default function Clients() {
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ type: null, patient: null });
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    birthDate: '',
    gender: 'Feminino',
    phone: '',
  });

  // 1. CARREGAR PACIENTES DO DJANGO
  useEffect(() => {
    carregarPacientes();
  }, []);

  const carregarPacientes = async () => {
    try {
      const resposta = await fetch('http://localhost:8000/api/pacientes/');
      if (resposta.ok) {
        const dados = await resposta.json();
        setPatients(dados);
      }
    } catch (erro) {
      console.error("Erro ao buscar pacientes:", erro);
    }
  };

  // Funções Auxiliares de Formatação (Com fallback para evitar erros)
  const formatCPF = (cpf) => {
    if (!cpf) return '-';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const formatPhone = (phone) => {
    if (!phone) return '-';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return cleaned;
  };

  // Filtragem da Busca
  const filteredPatients = patients.filter(patient => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    const searchNumbers = searchTerm.replace(/\D/g, ''); 
    
    const matchesName = patient.name?.toLowerCase().includes(searchLower) || false;
    const matchesCPF = (searchNumbers !== '' && patient.cpf) ? patient.cpf.includes(searchNumbers) : false;

    return matchesName || matchesCPF;
  });

  const openModal = (type, patient) => {
    setModalConfig({ type, patient });
    
    if (type === 'edit') {
      // Previne undefined se for um paciente criado direto no calendário (que só tem nome)
      setFormData({
        id: patient.id,
        name: patient.name || '',
        cpf: patient.cpf || '',
        birthDate: patient.birthDate || '',
        gender: patient.gender || 'Feminino',
        phone: patient.phone || ''
      });
    } else if (type === 'new') {
      setFormData({ name: '', cpf: '', birthDate: '', gender: 'Feminino', phone: '' });
    }
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalConfig({ type: null, patient: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cpf' || name === 'phone') {
      const onlyNumbers = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: onlyNumbers }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // 2. SALVAR NO DJANGO (CRIAR E ATUALIZAR)
  const handleSaveForm = async (e) => {
    e.preventDefault(); 

    const url = modalConfig.type === 'edit' 
      ? `http://localhost:8000/api/pacientes/${formData.id}/` 
      : 'http://localhost:8000/api/pacientes/';
    
    const metodoHTTP = modalConfig.type === 'edit' ? 'PUT' : 'POST';

    try {
      const resposta = await fetch(url, {
        method: metodoHTTP,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (resposta.ok) {
        carregarPacientes(); // Recarrega a lista com dados atualizados
        closeModal();
      } else {
        alert("Erro ao salvar paciente na API.");
      }
    } catch (erro) {
      console.error("Erro de conexão:", erro);
    }
  };

  // 3. EXCLUIR DO DJANGO
  const handleDeletePatient = async () => {
    try {
      const resposta = await fetch(`http://localhost:8000/api/pacientes/${modalConfig.patient.id}/`, {
        method: 'DELETE',
      });

      if (resposta.ok) {
        setPatients(prev => prev.filter(p => p.id !== modalConfig.patient.id));
        closeModal();
      } else {
        alert("Erro ao tentar excluir na API.");
      }
    } catch (erro) {
      console.error("Erro ao excluir:", erro);
    }
  };

  const renderModalContent = () => {
    const { type, patient } = modalConfig;

    if (type === 'new' || type === 'edit') {
      return (
        <form onSubmit={handleSaveForm} className="w-full">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            {type === 'new' ? 'Adicionar Novo Paciente' : 'Editar Paciente'}
          </h2>
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-xs text-slate-500 font-medium mb-1 block">Nome Completo</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-slate-200 rounded-lg text-sm" 
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 font-medium mb-1 block">CPF (Apenas Números)</label>
                <input 
                  type="text" 
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  maxLength="11"
                  placeholder="00000000000" 
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm" 
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium mb-1 block">Data de Nascimento</label>
                <input 
                  type="date" 
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm" 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 font-medium mb-1 block">Gênero</label>
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-white" 
                >
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium mb-1 block">Telefone (Apenas Números)</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength="11"
                  placeholder="51900000000" 
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm" 
                />
              </div>
            </div>
          </div>
          <button 
            type="submit" 
            className="w-full py-2.5 bg-[#6BB0C1] hover:bg-[#5da2b1] text-white rounded-lg font-semibold transition-colors"
          >
            {type === 'new' ? 'Cadastrar Paciente' : 'Salvar Alterações'}
          </button>
        </form>
      );
    }

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
                  <p className="font-medium text-slate-800">{formatCPF(patient.cpf)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Data de Nasc.</p>
                  <p className="font-medium text-slate-800">{formatDate(patient.birthDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Gênero</p>
                  <p className="font-medium text-slate-800">{patient.gender || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Telefone</p>
                  <p className="font-medium text-slate-800">{formatPhone(patient.phone)}</p>
                </div>
              </div>
            </div>
            <button onClick={closeModal} className="w-full py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors">Fechar Prontuário</button>
          </div>
        );
      case 'delete':
        return (
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-600 mb-4" />
            <h2 className="text-xl font-bold mb-2 text-slate-800">Excluir Paciente</h2>
            <p className="text-slate-500 text-sm mb-6">Tem certeza que deseja excluir permanentemente o paciente <strong className='text-slate-800'>{patient.name}</strong>? Esta ação não pode ser desfeita.</p>
            <div className='flex gap-3'>
              <button onClick={closeModal} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors">Cancelar</button>
              <button onClick={handleDeletePatient} className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">Confirmar Exclusão</button>
            </div>
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
        <button 
          onClick={() => openModal('new', null)} 
          className="bg-[#6BB0C1] hover:bg-[#5da2b1] text-white px-4 py-2 rounded-lg font-medium shadow-sm flex items-center gap-2 transition-colors"
        >
          <Plus size={20} /> Novo Paciente
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou CPF..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-[#6BB0C1]" 
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
            <tr>
              <th className="p-4">Nome / CPF</th>
              <th className="p-4">Contato</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-slate-800">{p.name}</div>
                    <div className="text-xs text-slate-400">CPF: {formatCPF(p.cpf)}</div>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{formatPhone(p.phone)}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button onClick={() => openModal('prontuario', p)} className="p-2 text-slate-400 hover:text-[#6BB0C1]" title="Prontuário"><FileText size={18} /></button>
                    <button onClick={() => openModal('edit', p)} className="p-2 text-slate-400 hover:text-slate-800" title="Editar"><Edit size={18} /></button>
                    <button onClick={() => openModal('delete', p)} className="p-2 text-slate-400 hover:text-red-600" title="Excluir"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-8 text-center text-slate-500">
                  Nenhum paciente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div onClick={closeModal} className="absolute inset-0"></div>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative z-10 transition-all">
            <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
              <X size={20} />
            </button>
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
}