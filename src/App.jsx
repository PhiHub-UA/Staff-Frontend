import {Routes, Route, BrowserRouter} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import Dashboard from './components/pages/Dashboard';
import AddMedic from './components/pages/AddMedic';
import AddStaff from './components/pages/AddStaff';
import Medics from './components/pages/Medics';
import Staff from './components/pages/Staff';
import MyAppointments from './components/pages/Appointments';

function App () {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addmedic" element={<AddMedic />} />
        <Route path="/addstaff" element={<AddStaff />} />
        <Route path="/medics" element={<Medics />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/appointments" element={<MyAppointments />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
