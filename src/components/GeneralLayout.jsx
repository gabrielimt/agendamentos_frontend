import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function GeneralLayout() {
  return (
    <div className="flex min-h-screen">
      
      {/* O shrink-0 protege a Sidebar de ser esmagada */}
      <aside className="shrink-0">
        <Sidebar />
      </aside>

      {/* flex-1 ocupa o espaço restante, min-w-0 impede de vazar da tela */}
      <main className="flex-1 min-w-0 p-5">
        <Outlet />
      </main>
      
    </div>
  );
}