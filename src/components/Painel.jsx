import React from 'react';
import { 
  Calendar, ClockArrowRight, NotepadTextDashed, UsersRound, 
  Activity, Eye, Brain, Baby, RefreshCcw 
} from 'lucide-react';

export default function Painel() {
  // Dados simulados para a lista de agendamentos baseados na imagem
  const agendamentosHoje = [
    { id: 1, nome: "Carlos Pereira", hora: "09:30", especialidade: "Cardiology", status: "Confirmado", statusColor: "text-green-600", dotColor: "bg-green-600", Icon: Activity },
    { id: 2, nome: "Carlos Pereira", hora: "09:30", especialidade: "Ophthalmology", status: "Em Progresso", statusColor: "text-orange-500", dotColor: "bg-orange-500", Icon: Eye },
    { id: 3, nome: "Carlos Pereira", hora: "09:30", especialidade: "Neurology", status: "A Confirmar", statusColor: "text-gray-500", dotColor: "bg-gray-400", Icon: Brain },
    { id: 4, nome: "Carlos Pereira", hora: "09:30", especialidade: "Neurology", status: "A Confirmar", statusColor: "text-gray-500", dotColor: "bg-gray-400", Icon: Brain },
    { id: 5, nome: "Carlos Pereira", hora: "12:00", especialidade: "Pediatrics", status: "A Confirmar", statusColor: "text-gray-500", dotColor: "bg-gray-400", Icon: Baby },
    { id: 6, nome: "Carlos Pereira", hora: "13:00", especialidade: "Pediatrics", status: "A Confirmar", statusColor: "text-gray-500", dotColor: "bg-gray-400", Icon: Baby },
    { id: 7, nome: "Carlos Pereira", hora: "09:30", especialidade: "Pediatrics", status: "Confirmado", statusColor: "text-green-600", dotColor: "bg-green-600", Icon: Baby },
  ];

  return (
    <main className="w-full bg-white font-sans p-8 overflow-y-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Painel</h2>

      {/* 4 Cards Superiores (Resumo) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex justify-between items-start">
          <div>
            <h3 className="text-[#102B4E] text-sm font-medium">Agendamentos de Hoje</h3>
            <p className="text-slate-900 text-4xl font-bold mt-3">12</p>
          </div>
          <div className="bg-[#6BB0C1] p-3 rounded-full text-white">
            <Calendar size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex justify-between items-start">
          <div>
            <h3 className="text-[#102B4E] text-sm font-medium">Status da Recepção<br/><span className="text-xs font-normal">(esperando)</span></h3>
            <p className="text-slate-900 text-4xl font-bold mt-3">3</p>
          </div>
          <div className="bg-[#6BB0C1] p-3 rounded-full text-white">
            <ClockArrowRight size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex justify-between items-start">
          <div>
            <h3 className="text-[#102B4E] text-sm font-medium">Agendamentos a Confirmar</h3>
            <p className="text-slate-900 text-4xl font-bold mt-3">7</p>
          </div>
          <div className="bg-[#6BB0C1] p-3 rounded-full text-white">
            <NotepadTextDashed size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex justify-between items-start">
          <div>
            <h3 className="text-[#102B4E] text-sm font-medium">Pacientes Cadastrados</h3>
            <p className="text-slate-900 text-4xl font-bold mt-3">265</p>
          </div>
          <div className="bg-[#6BB0C1] p-3 rounded-full text-white">
            <UsersRound size={24} strokeWidth={2} />
          </div>
        </div>
      </section>

      {/* Layout Inferior: Lista Detalhada (Esquerda) e Widgets (Direita) */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Coluna Esquerda: Agendamentos de Hoje - Detalhados */}
        <div className="xl:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Agendamentos de Hoje - Detalhados</h3>
          
          <div className="flex flex-col">
            {agendamentosHoje.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                {/* Avatar e Nome */}
                <div className="flex items-center gap-4 w-1/4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                     <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${item.nome}${item.id}&backgroundColor=e5e7eb`} alt="Avatar" className="w-full h-full" />
                  </div>
                  <span className="font-medium text-gray-700">{item.nome}</span>
                </div>
                
                {/* Horário */}
                <div className="w-1/6 text-gray-600 font-medium">{item.hora}</div>
                
                {/* Especialidade */}
                <div className="w-1/3 flex items-center gap-2 text-gray-700">
                  <item.Icon size={20} className="text-gray-500" />
                  {item.especialidade}
                </div>
                
                {/* Status */}
                <div className={`w-1/4 flex items-center justify-end gap-2 font-medium ${item.statusColor}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${item.dotColor}`}></span>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna Direita: Widgets */}
        <div className="xl:col-span-1 flex flex-col gap-6">

          {/* Widget: Gráfico de Distribuição */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h3 className="text-gray-900 font-bold mb-4">Distribuição Semanal de Agendamentos<br/><span className="text-sm font-normal text-gray-500">(Últimos 30 dias)</span></h3>
            
            <div className="h-40 flex items-end justify-between gap-2 mt-4 relative">
              {/* Linhas de grade */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                <div className="border-b border-black w-full h-0"></div>
                <div className="border-b border-black w-full h-0"></div>
                <div className="border-b border-black w-full h-0"></div>
                <div className="border-b border-black w-full h-0"></div>
                <div className="border-b border-black w-full h-0"></div>
              </div>
              
              {/* Barras */}
              <div className="w-full flex flex-col items-center gap-2 z-10"><div className="w-full bg-[#058190] h-16 rounded-t-sm"></div><span className="text-xs text-gray-600">Seg</span></div>
              <div className="w-full flex flex-col items-center gap-2 z-10"><div className="w-full bg-[#058190] h-20 rounded-t-sm"></div><span className="text-xs text-gray-600">Ter</span></div>
              <div className="w-full flex flex-col items-center gap-2 z-10"><div className="w-full bg-[#058190] h-20 rounded-t-sm"></div><span className="text-xs text-gray-600">Qua</span></div>
              <div className="w-full flex flex-col items-center gap-2 z-10"><div className="w-full bg-[#058190] h-28 rounded-t-sm"></div><span className="text-xs text-gray-600">Qui</span></div>
              <div className="w-full flex flex-col items-center gap-2 z-10"><div className="w-full bg-[#058190] h-32 rounded-t-sm"></div><span className="text-xs text-gray-600">Sex</span></div>
              <div className="w-full flex flex-col items-center gap-2 z-10"><div className="w-full bg-[#058190] h-6 rounded-t-sm"></div><span className="text-xs text-gray-600">Sáb</span></div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}