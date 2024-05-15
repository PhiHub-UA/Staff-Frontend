import {Routes, Route, BrowserRouter} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import Dashboard from './components/pages/Dashboard';
import AddMedic from './components/pages/AddMedic';
import AddStaff from './components/pages/AddStaff';

function App () {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addmedic" element={<AddMedic />} />
        <Route path="/addstaff" element={<AddStaff />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
