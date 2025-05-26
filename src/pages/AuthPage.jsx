
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
        <Card className="shadow-2xl bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800">
          <CardHeader className="text-center">
            <motion.div
              initial={{ y: -20, opacity: 0}}
              animate={{ y: 0, opacity: 1}}
              transition={{delay: 0.1}}
            >
              <img  alt="UniForum Logo" className="mx-auto h-28 w-auto mb-4" src="https://i.imgur.com/LQZWi1L.jpeg" />
              <CardTitle className="text-3xl font-bold uniforum-text-gradient">
                UniForum Unilasallista
              </CardTitle>
              <CardDescription className="text-lg mt-1">
                {activeTab === 'login' ? 'Inicia sesión para continuar' : 'Crea tu cuenta institucional'}
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <AuthForm mode="login" />
            </TabsContent>
            <TabsContent value="register">
              <AuthForm mode="register" />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </motion.div>
  );
};

export default AuthPage;
  