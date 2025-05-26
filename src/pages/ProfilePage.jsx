import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Assuming you'll create this
import { Button } from '@/components/ui/button';
import { Mail, Edit3, ShieldCheck, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <p>Cargando perfil...</p>; 
  }

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };
  
  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="shadow-xl overflow-hidden">
        <div className="uniforum-gradient-bg h-32 md:h-40" />
        <CardHeader className="text-center -mt-16 md:-mt-20">
          <Avatar className="mx-auto h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
            <AvatarImage src={user.avatarUrl || `https://avatar.vercel.sh/${user.email}.png`} alt={user.name || user.email} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl mt-4">{user.name || 'Usuario UniForum'}</CardTitle>
          <CardDescription className="flex items-center justify-center text-muted-foreground">
            <Mail className="h-4 w-4 mr-2" /> {user.email}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-primary">Información de la Cuenta</h2>
            <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-md">
              <span className="text-sm font-medium">Nombre de Usuario:</span>
              <span className="text-sm text-muted-foreground">{user.name || 'No especificado'}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-md">
              <span className="text-sm font-medium">Rol:</span>
              <span className="text-sm text-muted-foreground flex items-center">
                <ShieldCheck className="h-4 w-4 mr-1 text-green-500" /> Estudiante
              </span>
            </div>
             <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-md">
              <span className="text-sm font-medium">Miembro desde:</span>
              <span className="text-sm text-muted-foreground">Enero 2024 (Simulado)</span>
            </div>
          </div>

          <div className="space-y-3">
             <h2 className="text-lg font-semibold text-primary">Actividad Reciente</h2>
             <p className="text-sm text-muted-foreground italic">
                Aún no hay actividad registrada. ¡Empieza a explorar y participar!
             </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button variant="outline" className="w-full sm:w-auto">
              <Edit3 className="mr-2 h-4 w-4" /> Editar Perfil
            </Button>
            <Button variant="destructive" onClick={handleLogout} className="w-full sm:w-auto">
              <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfilePage;