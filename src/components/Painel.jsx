import React, { useState, useEffect } from 'react';
import { 
  Calendar, ClockArrowRight, NotepadTextDashed, UsersRound, 
  Activity 
} from 'lucide-react';

export default function Painel() {
  const [resumo, setResumo] = useState({
    agendamentosHoje: 0,
    recepcaoEsperando: 0,
    agendamentosAConfirmar: 0,
    totalPacientes: 0
  });
  
  const [agendamentosDeHoje, setAgendamentosDeHoje] = useState([]);
  
  // Novo estado para o gráfico
  const [distribuicao, setDistribuicao] = useState({
    contagem: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }, // 1=Seg, 2=Ter... 6=Sáb
    max: 1 // Evita divisão por zero
  });

  useEffect(() => {
    carregarPainel();
  }, []);

  const carregarPainel = async () => {
    try {
      const resResumo = await fetch('http://localhost:8000/api/dashboard/resumo/');
      if (resResumo.ok) {
        const dadosResumo = await resResumo.json();
        setResumo(dadosResumo);
      }

      const resCalendario = await fetch('http://localhost:8000/api/calendario/');
      if (resCalendario.ok) {
        const todosAgendamentos = await resCalendario.json();
        
        // 1. Filtro dos agendamentos de hoje
        const hoje = new Date();
        const dataHojeStr = hoje.toISOString().split('T')[0];

        const filtradosHoje = todosAgendamentos
          .filter(agendamento => agendamento.date === dataHojeStr)
          .sort((a, b) => a.time.localeCompare(b.time));
          
        setAgendamentosDeHoje(filtradosHoje);

        // 2. Cálculo do Gráfico Semanal
        const contagemSemana = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
        
        todosAgendamentos.forEach(ag => {
          // Quebra a string "YYYY-MM-DD" para criar a data exata sem erro de fuso horário
          if (ag.date) {
            const [ano, mes, dia] = ag.date.split('-');
            const dataObj = new Date(ano, mes - 1, dia);
            const diaSemana = dataObj.getDay(); // 0=Dom, 1=Seg, 2=Ter...
            
            // Só conta de Segunda (1) a Sábado (6)
            if (diaSemana >= 1 && diaSemana <= 6) {
              contagemSemana[diaSemana]++;
            }
          }
        });

        // Acha o dia com mais agendamentos para definir a barra de 100%
        const maiorNumero = Math.max(...Object.values(contagemSemana), 1);
        setDistribuicao({ contagem: contagemSemana, max: maiorNumero });
      }
    } catch (erro) {
      console.error("Erro ao carregar os dados do painel:", erro);
    }
  };

  const getStatusEstilo = (statusBanco) => {
    switch(statusBanco) {
      case 'CONFIRMADO': 
        return { texto: 'Confirmado', corTexto: 'text-green-600', corBolinha: 'bg-green-600' };
      case 'ESPERANDO': 
        return { texto: 'Na Recepção', corTexto: 'text-orange-500', corBolinha: 'bg-orange-500' };
      case 'A_CONFIRMAR':
      default: 
        return { texto: 'A Confirmar', corTexto: 'text-gray-500', corBolinha: 'bg-gray-400' };
    }
  };

  // Array auxiliar para renderizar o gráfico
  const diasGrafico = [
    { id: 1, label: 'Seg' },
    { id: 2, label: 'Ter' },
    { id: 3, label: 'Qua' },
    { id: 4, label: 'Qui' },
    { id: 5, label: 'Sex' },
    { id: 6, label: 'Sáb' }
  ];

  return (
    <main className="w-full bg-white font-sans p-8 overflow-y-auto min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Painel</h2>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex justify-between items-start">
          <div>
            <h3 className="text-[#102B4E] text-sm font-medium">Agendamentos de Hoje</h3>
            <p className="text-slate-900 text-4xl font-bold mt-3">{resumo.agendamentosHoje}</p>
          </div>
          <div className="bg-[#6BB0C1] p-3 rounded-full text-white">
            <Calendar size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex justify-between items-start">
          <div>
            <h3 className="text-[#102B4E] text-sm font-medium">Status da Recepção<br/><span className="text-xs font-normal">(esperando)</span></h3>
            <p className="text-slate-900 text-4xl font-bold mt-3">{resumo.recepcaoEsperando}</p>
          </div>
          <div className="bg-[#6BB0C1] p-3 rounded-full text-white">
            <ClockArrowRight size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex justify-between items-start">
          <div>
            <h3 className="text-[#102B4E] text-sm font-medium">Agendamentos a Confirmar</h3>
            <p className="text-slate-900 text-4xl font-bold mt-3">{resumo.agendamentosAConfirmar}</p>
          </div>
          <div className="bg-[#6BB0C1] p-3 rounded-full text-white">
            <NotepadTextDashed size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex justify-between items-start">
          <div>
            <h3 className="text-[#102B4E] text-sm font-medium">Pacientes Cadastrados</h3>
            <p className="text-slate-900 text-4xl font-bold mt-3">{resumo.totalPacientes}</p>
          </div>
          <div className="bg-[#6BB0C1] p-3 rounded-full text-white">
            <UsersRound size={24} strokeWidth={2} />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Lista Detalhada */}
        <div className="xl:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Agendamentos de Hoje - Detalhados</h3>
          
          <div className="flex flex-col">
            {agendamentosDeHoje.length === 0 ? (
               <div className="text-center text-gray-500 py-8 border border-dashed border-gray-200 rounded-lg">
                 Nenhum agendamento para hoje.
               </div>
            ) : (
              agendamentosDeHoje.map((item) => {
                const estilo = getStatusEstilo(item.status);
                
                return (
                  <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors px-2 rounded-lg">
                    <div className="flex items-center gap-4 w-1/4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                         <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${item.patientName}&backgroundColor=e5e7eb`} alt="Avatar" className="w-full h-full" />
                      </div>
                      <span className="font-medium text-gray-700 truncate" title={item.patientName}>
                        {item.patientName}
                      </span>
                    </div>
                    
                    <div className="w-1/6 text-gray-600 font-bold">{item.time.substring(0, 5)}</div>
                    
                    <div className="w-1/3 flex items-center gap-2 text-gray-700 truncate" title={item.service}>
                      <Activity size={18} className="text-[#6BB0C1] shrink-0" />
                      {item.service}
                    </div>
                    
                    <div className={`w-1/4 flex items-center justify-end gap-2 font-medium text-sm ${estilo.corTexto}`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${estilo.corBolinha}`}></span>
                      {estilo.texto}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Gráfico Dinâmico */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h3 className="text-gray-900 font-bold mb-4">Distribuição Semanal<br/><span className="text-sm font-normal text-gray-500">(Total de agendamentos)</span></h3>
            
            <div className="h-40 flex items-end justify-between gap-2 mt-4 relative pt-4">
              {/* Linhas de fundo */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                <div className="border-b border-black w-full h-0"></div>
                <div className="border-b border-black w-full h-0"></div>
                <div className="border-b border-black w-full h-0"></div>
                <div className="border-b border-black w-full h-0"></div>
              </div>
              
              {/* Barras dinâmicas */}
              {diasGrafico.map((dia) => {
                const valor = distribuicao.contagem[dia.id];
                // Calcula a porcentagem de altura. Se for 0, coloca 5% só para a barrinha não sumir totalmente
                const alturaPercentual = valor === 0 ? 5 : (valor / distribuicao.max) * 100;
                
                return (
                  <div key={dia.id} className="w-full h-full flex flex-col items-center justify-end gap-2 z-10 group relative">
                    {/* Tooltip (mostra o número exato ao passar o mouse) */}
                    <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs py-1 px-2 rounded">
                      {valor}
                    </div>
                    
                    <div 
                      className="w-full bg-[#6BB0C1] rounded-t-sm hover:opacity-80 transition-all duration-500" 
                      style={{ height: `${alturaPercentual}%` }}
                    ></div>
                    <span className="text-xs font-medium text-gray-600">{dia.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}