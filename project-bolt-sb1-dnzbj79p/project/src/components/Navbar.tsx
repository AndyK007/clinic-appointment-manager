import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Clinic Manager
          </Link>
          <Link to="/add" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
            New Appointment
          </Link>
        </div>
      </div>
    </nav>
  );
}