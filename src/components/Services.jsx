import React, { useState } from 'react';
import { Clock, CircleDollarSign, Heart, Eye, Brain, Baby } from 'lucide-react';

export default function Services() {
  const [services] = useState([
    { 
      id: 1, 
      name: 'Cardiologia', 
      time: '30 min', 
      price: 'R$ 250,00', 
      Icon: Heart
    },
    { 
      id: 2, 
      name: 'Oftalmologia', 
      time: '20 min', 
      price: 'R$ 200,00', 
      Icon: Eye
    },
    { 
      id: 3, 
      name: 'Neurologia', 
      time: '45 min', 
      price: 'R$ 300,00', 
      Icon: Brain
    },
    { 
      id: 4, 
      name: 'Pediatria', 
      time: '30 min', 
      price: 'R$ 180,00', 
      Icon: Baby
    }
  ]);

  return (
    <div className="flex-1 min-w-0 p-8 bg-[#f8fafc] min-h-screen font-sans">
      
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Serviços</h1>
      </div>

      {/* Lista de Serviços */}
      <div className="flex flex-col gap-4">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-5 flex items-center transition-all hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]"
          >
            {/* Informações do Serviço */}
            <div className="flex items-center gap-5 pl-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#6BB0C1]/10 text-[#6BB0C1]">
                <service.Icon size={24} strokeWidth={2} />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-bold text-slate-800">{service.name}</h3>
                <div className="flex items-center gap-5 text-sm text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-slate-400" />
                    <span>{service.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CircleDollarSign size={16} className="text-slate-400" />
                    <span>{service.price}</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
      
    </div>
  );
}