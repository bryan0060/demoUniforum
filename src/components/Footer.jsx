import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const mapEmbedUrl = "https://maps.google.com/maps?q=Carrera%2051%20N%C2%BA118Sur%20-%2057%2C%20Caldas%2C%20Antioquia&t=m&z=15&output=embed&iwloc=near";

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-muted text-muted-foreground py-8 border-t"
    >
      <div className="container mx-auto px-4 text-center">
        {/* Aquí es donde se coloca el iframe del mapa */}
        <div className="mb-4">
          <iframe
            src={mapEmbedUrl}
            width="100%" // O ajusta a un valor específico como "600"
            height="250" // O ajusta a un valor específico como "450"
            style={{ border: 0, borderRadius: '8px' }} // Estilos y bordes redondeados
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de UniForum en Google Maps" // Título descriptivo para accesibilidad
          ></iframe>
        </div>

        <p className="text-sm">
          © {currentYear} UniForum - Corporación Universitaria Lasallista. Todos los derechos reservados.
        </p>
        <p className="text-xs mt-2">
          Una plataforma para la socialización del conocimiento académico.
        </p>
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