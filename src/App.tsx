import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Login from './pages/Login';
import Donations from './pages/Donations';
import Disposals from './pages/Disposals';
import Vouchers from './pages/Vouchers';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNGOs from './pages/admin/NGOs';
import AdminBrands from './pages/admin/Brands';
import Registration from './pages/Register';
import DonorDashboard from './pages/DonorDashboard';
import AdminUsers from './pages/admin/Users';

import Layout from './components/Layout';
import NgoRegistration from './components/NgoRegistration';
import DonorRegistration from './components/DonorRegistration';
import About from './components/About';
import VerificationPage from './pages/Verifcation';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration/>} />
            <Route path="register/ngo" element={<NgoRegistration/>} />
            <Route path="register/donor" element={<DonorRegistration/>} />
            <Route path="register/verification" element={<VerificationPage />} />
            <Route path="About" element={<About/>} />
            
            {/* Protected User Routes */}
            {/* <Route element={<ProtectedRoute allowedRoles={['user']} />}> */}
              <Route path="dashboard" element={<DonorDashboard />} />
              <Route path="donations" element={<Donations />} />
              <Route path="disposals" element={<Disposals />} />
              <Route path="vouchers" element={<Vouchers />} />
            {/* </Route> */}

            {/* Protected Admin Routes */}
            {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}> */}
              <Route path="admin">
                <Route index element={<AdminDashboard />} />
                <Route path="ngos" element={<AdminNGOs />} />
                <Route path="brands" element={<AdminBrands />} />
                <Route path="users" element={<AdminUsers />} />
              </Route>
            {/* </Route> */}
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;