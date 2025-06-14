import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-muted text-muted-foreground py-8 border-t"
    >
      <div className="container mx-auto px-4 text-center">
        {/* Aquí es donde se coloca el iframe del mapa */}
        <p className="text-sm">
          © {currentYear} UniForum - Corporación Universitaria Lasallista. Todos los derechos reservados.
        </p>
        <p className="text-xs mt-2">
          Una plataforma para la socialización del conocimiento académico.
        </p>
        <img 
          src="https://i.imgur.com/sFEwxry.png" 
          alt="Map of Corporación Universitaria Lasallista" 
          className="mt-4 mx-auto" />
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:text-primary transition-colors text-sm">Política de Privacidad</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:text-primary transition-colors text-sm">Términos de Servicio</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:text-primary transition-colors text-sm">Contacto</a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;