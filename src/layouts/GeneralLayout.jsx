import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function GeneralLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <main style={{ flexGrow: 1, padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
}