import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Briefcase, 
  FileText, 
  Settings 
} from 'lucide-react';

const MENU_GROUPS = [
  {
    title: 'Principal', 
    items: [
      { path: '/', label: 'Painel', icon: LayoutDashboard },
      { path: '/calendario', label: 'Calendário', icon: Calendar },
    ]
  },
  {
    title: 'Gestão',
    items: [
      { path: '/servicos', label: 'Serviços', icon: Briefcase },
      { path: '/clientes', label: 'Clientes', icon: Users },
      { path: '/relatorios', label: 'Relatórios', icon: FileText },
    ]
  },
  {
    title: 'Nothing',
    items: [
      { path: '/configuracoes', label: 'Configurações', icon: Settings },
    ]
  }
];

const SidebarItem = ({ to, icon: Icon, children }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center gap-4 px-4 py-2 transition-colors duration-200 text-white ${
          isActive 
            ? 'bg-white/20 font-semibold shadow-sm' 
            : 'hover:bg-white/10'
        }`
      }
    >
      <Icon className="w-6 h-6 stroke-[1.5]" />
      <span className="text-lg font-light">{children}</span>
    </NavLink>
  );
};

export default function Sidebar() {
  return (
    // Adicionamos 'sticky top-0' na linha abaixo:
    <aside className="w-64 bg-(--principal) h-screen flex flex-col shadow-lg sticky top-0">
      
      <div className="flex items-center justify-center mb-12 mt-4">
        <h1 className="text-white text-3xl font-bold tracking-wide">
          Agendamentos
        </h1>
      </div>
      
      {/* Adicionei 'overflow-y-auto' aqui por precaução */}
      <nav className="flex flex-col gap-8 flex-1 overflow-y-auto">
        {MENU_GROUPS.map((group, index) => (
          <div key={index}>
            <h3 className="text-white/80 text-sm font-normal mb-3 ml-4">
              {group.title}
            </h3>
            
            <div className="flex flex-col">
              {group.items.map((item) => (
                <SidebarItem key={item.path} to={item.path} icon={item.icon}>
                  {item.label}
                </SidebarItem>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}