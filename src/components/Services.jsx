import React, { useState, useEffect } from 'react';
import { Clock, CircleDollarSign, Stethoscope } from 'lucide-react'; // Trocamos os ícones por um geral (Stethoscope) para não quebrar caso o nome do banco não bata com o ícone

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Busca os serviços da nossa API do Django
    const carregarServicos = async () => {
      try {
        const resposta = await fetch('http://localhost:8000/api/servicos/');
        if (resposta.ok) {
          const dados = await resposta.json();
          setServices(dados);
        }
      } catch (erro) {
        console.error("Erro ao buscar os serviços:", erro);
      }
    };

    carregarServicos();
  }, []);

  return (
    <div className="flex-1 min-w-0 p-8 bg-[#f8fafc] min-h-screen font-sans">
      
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Serviços</h1>
      </div>

      {/* Lista de Serviços vinda do Banco de Dados */}
      <div className="flex flex-col gap-4">
        {services.length === 0 ? (
          <p className="text-slate-500">Nenhum serviço cadastrado ainda.</p>
        ) : (
          services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-5 flex items-center transition-all hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]"
            >
              {/* Informações do Serviço */}
              <div className="flex items-center gap-5 pl-2">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#6BB0C1]/10 text-[#6BB0C1]">
                  {/* Usando um ícone padrão de estetoscópio para todos os serviços que vêm do banco */}
                  <Stethoscope size={24} strokeWidth={2} />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-bold text-slate-800">{service.nome}</h3>
                  <div className="flex items-center gap-5 text-sm text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} className="text-slate-400" />
                      {/* O Django retorna nulo se não houver duração, então colocamos um fallback */}
                      <span>{service.duracao || '30 min'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CircleDollarSign size={16} className="text-slate-400" />
                      {/* Formatando o preço do banco (ex: "0.00") para Real */}
                      <span>R$ {parseFloat(service.preco).toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          ))
        )}
      </div>
      
    </div>
  );
}