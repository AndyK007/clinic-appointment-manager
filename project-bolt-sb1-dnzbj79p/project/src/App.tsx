import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppointmentList from './components/AppointmentList';
import AddAppointment from './components/AddAppointment';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<AppointmentList />} />
            <Route path="/add" element={<AddAppointment />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;