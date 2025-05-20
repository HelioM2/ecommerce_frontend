import { Menu } from 'lucide-react';
import logo from '../assets/logo.png';

const HeaderDashboard = ({ toggleMenu }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center md:hidden">
      <button onClick={toggleMenu} className="text-white">
        <Menu size={28} />
      </button>
              <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
    </header>
  );
};

export default HeaderDashboard;
