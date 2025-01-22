import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { Toaster } from '@/components/ui/toaster';
import Layout from './components/Layout';
// import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
import Donations from './pages/Donations';
import Disposals from './pages/Disposals';
import Vouchers from './pages/Vouchers';
// import AdminDashboard from './pages/admin/Dashboard';
import AdminNGOs from './pages/admin/NGOs';
import AdminBrands from './pages/admin/Brands';
// import AdminUsers from './pages/admin/Users';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            {/* <Route path="register" element={<Register />} /> */}
            
            {/* Protected User Routes */}
            {/* <Route element={<ProtectedRoute allowedRoles={['user']} />}> */}
              {/* <Route path="dashboard" element={<Dashboard />} /> */}
              <Route path="donations" element={<Donations />} />
              <Route path="disposals" element={<Disposals />} />
              <Route path="vouchers" element={<Vouchers />} />
            {/* </Route> */}

            {/* Protected Admin Routes */}
            {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}> */}
              <Route path="admin">
                {/* <Route index element={<AdminDashboard />} /> */}
                <Route path="ngos" element={<AdminNGOs />} />
                <Route path="brands" element={<AdminBrands />} />
                {/* <Route path="users" element={<AdminUsers />} /> */}
              </Route>
            {/* </Route> */}
          </Route>
        </Routes>
        {/* <Toaster /> */}
      </Router>
    </QueryClientProvider>
  );
}

export default App;