
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('uniforum_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
      localStorage.removeItem('uniforum_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        if (email.endsWith('@unilasallista.edu.co')) {
          const mockUser = { id: '1', email, name: email.split('@')[0] };
          localStorage.setItem('uniforum_user', JSON.stringify(mockUser));
          setUser(mockUser);
          setLoading(false);
          toast({ title: "Inicio de sesión exitoso", description: `Bienvenido, ${mockUser.name}!` });
          resolve(mockUser);
        } else {
          setLoading(false);
          toast({ variant: "destructive", title: "Error de inicio de sesión", description: "Por favor, usa tu correo institucional (@unilasallista.edu.co)." });
          reject(new Error("Correo institucional requerido."));
        }
      }, 1000);
    });
  };

  const register = (email, password) => {
     return new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        if (email.endsWith('@unilasallista.edu.co')) {
          const newUser = { id: Date.now().toString(), email, name: email.split('@')[0] };
          localStorage.setItem('uniforum_user', JSON.stringify(newUser));
          setUser(newUser);
          setLoading(false);
          toast({ title: "Registro exitoso", description: "Tu cuenta ha sido creada." });
          resolve(newUser);
        } else {
          setLoading(false);
          toast({ variant: "destructive", title: "Error de Registro", description: "Por favor, usa tu correo institucional (@unilasallista.edu.co)." });
          reject(new Error("Correo institucional requerido para registrarse."));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('uniforum_user');
    setUser(null);
    toast({ title: "Sesión cerrada", description: "Has cerrado sesión exitosamente." });
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
  