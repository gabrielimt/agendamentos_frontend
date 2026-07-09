import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, X } from 'lucide-react';
import { 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, 
  format, isSameMonth, isSameDay, addMonths, subMonths, addWeeks, subWeeks, 
  addDays, subDays, setMonth, setYear, getMonth, getYear 
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Calendary() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('Mês'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estado reservado para os dados da sua API
  const [appointments, setAppointments] = useState([]); 

  // --- NOVOS ESTADOS PARA O FORMULÁRIO ---
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [notes, setNotes] = useState('');

  // --- FUNÇÃO PARA SALVAR NO BANCO ---
  const handleSalvarAgendamento = async (e) => {
    e.preventDefault(); // Evita que a página recarregue

    const dadosParaEnvio = {
      patientName,
      date,
      time,
      service,
      notes
    };

    try {
      const resposta = await fetch('http://localhost:8000/api/calendario/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnvio)
      });

      if (resposta.ok) {
        alert("Agendamento salvo com sucesso no banco do Django!");
        setIsModalOpen(false); // Fecha o modal
        
        // Limpa os campos para o próximo cadastro
        setPatientName('');
        setDate('');
        setTime('');
        setService('');
        setNotes('');
      } else {
        alert("Erro ao salvar o agendamento na API.");
      }
    } catch (erro) {
      console.error("Erro de conexão com o backend:", erro);
    }
  };

  // --- LÓGICA DE NAVEGAÇÃO ---
  const handlePrev = () => {
    if (currentView === 'Mês') setCurrentDate(subMonths(currentDate, 1));
    else if (currentView === 'Semana') setCurrentDate(subWeeks(currentDate, 1));
    else if (currentView === 'Dia') setCurrentDate(subDays(currentDate, 1));
  };

  const handleNext = () => {
    if (currentView === 'Mês') setCurrentDate(addMonths(currentDate, 1));
    else if (currentView === 'Semana') setCurrentDate(addWeeks(currentDate, 1));
    else if (currentView === 'Dia') setCurrentDate(addDays(currentDate, 1));
  };

  const handleMonthSelect = (e) => setCurrentDate(setMonth(currentDate, parseInt(e.target.value)));
  const handleYearSelect = (e) => setCurrentDate(setYear(currentDate, parseInt(e.target.value)));

  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setMonth(i);
    return { value: i, label: format(d, 'MMMM', { locale: ptBR }) };
  });
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  // --- RENDERIZAÇÃO DAS VISUALIZAÇÕES ---

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    
    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-7 border-b border-gray-100 bg-white rounded-t-2xl">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(day => (
            <div key={day} className="py-3 text-center font-bold text-slate-700 border-r border-gray-100 last:border-0">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 bg-gray-100 gap-[1px] border-b border-gray-100 flex-1 rounded-b-2xl overflow-hidden">
          {calendarDays.map((dayDate, index) => {
            const isCurrentMonthDay = isSameMonth(dayDate, monthStart);
            const isToday = isSameDay(dayDate, new Date());
            
            return (
              <div key={index} className="bg-white min-h-[120px] p-2 flex flex-col gap-1 hover:bg-gray-50 transition-colors">
                <span className={`text-right text-sm font-medium ${!isCurrentMonthDay ? 'text-gray-400' : isToday ? 'text-blue-600 font-bold' : 'text-slate-700'}`}>
                  {format(dayDate, 'd')}
                </span>
                
                {/* Lógica futura para renderizar agendamentos que caem neste dia */}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
      <div className="flex flex-col h-full bg-white overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
          {weekDays.map((day, index) => (
            <div key={index} className="py-4 text-center border-r border-gray-100 last:border-0">
              <p className="text-sm font-bold text-slate-500 capitalize">{format(day, 'EEE', { locale: ptBR })}</p>
              <p className={`text-2xl font-bold mt-1 ${isSameDay(day, new Date()) ? 'text-blue-600' : 'text-slate-800'}`}>
                {format(day, 'd')}
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-[1px] bg-gray-100 flex-1 min-h-[400px]">
           {weekDays.map((day, index) => (
            <div key={index} className="bg-white p-2">
               {/* Lógica futura para renderizar agendamentos da semana */}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 10 }, (_, i) => i + 8); 

    return (
      <div className="bg-white p-6 h-full overflow-y-auto">
        <h3 className="text-2xl font-bold text-[#102B4E] mb-6 capitalize">
          {format(currentDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
        </h3>
        <div className="flex flex-col border border-gray-100 rounded-lg">
          {hours.map(hour => (
            <div key={hour} className="flex border-b border-gray-100 last:border-0">
              <div className="w-20 py-4 px-3 text-right text-gray-500 font-medium border-r border-gray-100 bg-gray-50">
                {hour}:00
              </div>
              <div className="flex-1 p-2 hover:bg-gray-50 transition-colors">
                 {/* Lógica futura para renderizar agendamentos deste horário */}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="bg-white p-6 h-full">
        <h3 className="text-xl font-bold text-[#102B4E] mb-6">Lista de Agendamentos</h3>
        <div className="flex flex-col gap-4">
          
          {appointments.length === 0 ? (
            <div className="p-8 text-center text-gray-500 border border-dashed border-gray-200 rounded-lg">
              Nenhum agendamento encontrado.
            </div>
          ) : (
            appointments.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-lg">{item.time} - {item.service}</p>
                    <p className="text-slate-500 capitalize">{format(new Date(item.date), "EEEE, d 'de' MMMM", { locale: ptBR })}</p>
                  </div>
                </div>
                <button className="text-[#6BB0C1] font-medium hover:underline">Ver Detalhes</button>
              </div>
            ))
          )}
          
        </div>
      </div>
    );
  };

  return (
    <section className="relative py-5 flex-1 min-w-0 flex flex-col h-screen">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h2 className="text-3xl font-bold text-[#102B4E]">Calendário</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#6BB0C1] border border-transparent rounded-lg px-5 py-2.5 font-medium text-white hover:bg-[#5a98a8] transition-colors shadow-sm"
        >
          + Novo Agendamento
        </button>
      </div>

      <div className="flex justify-between items-center mb-6 shrink-0 flex-wrap gap-4">
        
        <div className="flex items-center gap-3">
          <div className="flex border border-gray-300 rounded-lg bg-white overflow-hidden shadow-sm">
            <button onClick={handlePrev} className="px-3 py-2 border-r border-gray-300 hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button onClick={handleNext} className="px-3 py-2 hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <select 
            value={getMonth(currentDate)}
            onChange={handleMonthSelect}
            className="border border-gray-300 rounded-lg px-4 py-2 text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:border-[#6BB0C1] capitalize shadow-sm cursor-pointer"
          >
            {months.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>

          <select 
            value={getYear(currentDate)}
            onChange={handleYearSelect}
            className="border border-gray-300 rounded-lg px-4 py-2 text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:border-[#6BB0C1] shadow-sm cursor-pointer"
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="flex border border-gray-300 rounded-lg bg-white overflow-hidden shadow-sm">
          {['Dia', 'Semana', 'Mês', 'Lista'].map((view) => (
            <button 
              key={view}
              onClick={() => setCurrentView(view)}
              className={`px-5 py-2 font-medium transition-colors ${
                currentView === view 
                  ? 'bg-[#6BB0C1] text-white' 
                  : 'text-slate-700 hover:bg-gray-50 border-l border-gray-200 first:border-0'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      <article className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-0">
        {currentView === 'Mês' && renderMonthView()}
        {currentView === 'Semana' && renderWeekView()}
        {currentView === 'Dia' && renderDayView()}
        {currentView === 'Lista' && renderListView()}
      </article>
      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-[#102B4E]">Novo Agendamento</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-gray-700 transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>
            
            <form className="flex flex-col gap-4" onSubmit={handleSalvarAgendamento}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Paciente</label>
                <input 
                  type="text" 
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6BB0C1] focus:border-transparent transition-all" 
                  placeholder="Ex: João da Silva" 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                  <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6BB0C1] focus:border-transparent transition-all" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
                  <input 
                    type="time" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6BB0C1] focus:border-transparent transition-all" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especialidade / Serviço</label>
                <select 
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6BB0C1] focus:border-transparent transition-all"
                >
                  <option value="">Selecione...</option>
                  <option value="Clínica Geral">Clínica Geral</option>
                  <option value="Cardiologia">Cardiologia</option>
                  <option value="Oftalmologia">Oftalmologia</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Observações (Opcional)</label>
                <textarea 
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#6BB0C1] focus:border-transparent transition-all resize-none" 
                  placeholder="Alguma nota importante sobre o paciente..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 font-medium text-slate-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 font-medium text-white bg-[#6BB0C1] rounded-lg hover:bg-[#5a98a8] transition-colors"
                >
                  Salvar Agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}