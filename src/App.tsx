import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import { Navigate } from 'react-router-dom';
import Layout from './components/LayOut/layOut';
import AuthGuard from './guards/AuthGuard';
import TicketListPage from './pages/tickets/ticketListPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TicketDetailPage from './pages/tickets/ticketDetailPage';
import CreateTicketPage from './pages/tickets/CreateTicketPage';
import RoleGuard from './guards/RoleGuard';
import AdminDashboard from './pages/dashBoard/AdminDashboard';
import CustomerDashBoard from './pages/dashBoard/CustomerDashBoard';
import AgentDashboard from './pages/dashBoard/AgentDashboard';
import AdminAddStatus from './components/features/AdminAddStatus';
import UserListPage from './pages/users/UserListPage';
import GetUserById from './pages/users/GetUserById';
import CreateUserPage from './pages/users/CreateUserPage';

const queryClient = new QueryClient();
function App() {
  return (

  <QueryClientProvider client={queryClient}>
    <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="login" />} />
        <Route path="dashboard/admin" element={<AuthGuard><RoleGuard allowedRoles={['admin']}><AdminDashboard /></RoleGuard></AuthGuard>} />
        <Route path="dashboard/customer" element={<AuthGuard><RoleGuard allowedRoles={['customer']}><CustomerDashBoard /></RoleGuard></AuthGuard>} />
        <Route path="dashboard/agent" element={<AuthGuard><RoleGuard allowedRoles={['agent']}><AgentDashboard /></RoleGuard></AuthGuard>} />
        <Route path="tickets" element={<AuthGuard><TicketListPage /></AuthGuard>} />
        <Route path="/tickets/:id" element={<AuthGuard><TicketDetailPage /></AuthGuard>} />
        <Route path="/tickets/create" element={<AuthGuard><CreateTicketPage /></AuthGuard>} />
        <Route path="dashboard/admin/status" element={<AuthGuard><RoleGuard allowedRoles={['admin']}><AdminAddStatus /></RoleGuard></AuthGuard>} />
        <Route path="users" element={<AuthGuard><RoleGuard allowedRoles={['admin']}><UserListPage /></RoleGuard></AuthGuard>} />
        <Route path="users/:id" element={<AuthGuard><RoleGuard allowedRoles={['admin']}><GetUserById /></RoleGuard></AuthGuard>} />
        <Route path="newUser" element={<AuthGuard><RoleGuard allowedRoles={['admin']}><CreateUserPage /></RoleGuard></AuthGuard>} />
        </Route>
       </Routes>
    </QueryClientProvider>
  );
}

export default App;