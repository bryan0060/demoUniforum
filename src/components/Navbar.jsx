import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, UserCircle, Home, Search, MessageCircle, PlusCircle } from 'lucide-react'; // Changed BookOpenText to Search, MessageSquare to MessageCircle
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="bg-card shadow-md sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img  alt="UniForum Mini Logo" className="h-16 w-auto" src="https://i.imgur.com/LQZWi1L.jpeg" />
          <span className="text-xl font-bold uniforum-text-gradient">UniForum</span>
        </Link>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          {user ? (
            <>
              <NavLink to="/" icon={<Home className="h-4 w-4" />} >Inicio</NavLink>
              <NavLink to="/explore" icon={<Search className="h-4 w-4" />} >Explorar</NavLink>
              <NavLink to="/forums" icon={<MessageCircle className="h-4 w-4" />} >Foros</NavLink>
              <NavLink to="/create-post" icon={<PlusCircle className="h-4 w-4" />} >Crear</NavLink>
              <NavLink to="/profile" icon={<UserCircle className="h-4 w-4" />} >{user.name || 'Perfil'}</NavLink>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                <LogOut className="mr-1 md:mr-2 h-4 w-4" />
                <span className="hidden md:inline">Salir</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/auth')}>Iniciar Sesión</Button>
              <Button onClick={() => navigate('/auth')}>Registrarse</Button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ to, children, icon }) => (
  <Link to={to} className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-accent">
    {icon && <span className="mr-1 md:mr-1.5">{icon}</span>}
    <span className="hidden md:inline">{children}</span>
  </Link>
);

export default Navbar;