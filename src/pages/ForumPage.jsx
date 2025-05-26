import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare, Users, ThumbsUp, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockForums = [
  { id: 1, title: 'Discusión General sobre Cálculo Diferencial', subject: 'Cálculo I', posts: 25, members: 150, lastActivity: 'Hace 2 horas' },
  { id: 2, title: 'Ayuda con el Proyecto Final de POO', subject: 'Programación Orientada a Objetos', posts: 12, members: 80, lastActivity: 'Hace 5 horas' },
  { id: 3, title: 'Consultas sobre Algoritmos de Ordenamiento', subject: 'Estructuras de Datos', posts: 30, members: 120, lastActivity: 'Ayer' },
];

const ForumPage = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <header className="text-center py-8 uniforum-gradient-bg text-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold">Foros de Discusión</h1>
        <p className="text-lg mt-2 text-indigo-100">Conéctate, pregunta y comparte con tus compañeros.</p>
      </header>

      <section className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-card rounded-lg shadow">
        <div className="relative flex-grow w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Buscar en foros..." className="pl-10 w-full" />
        </div>
        <Button onClick={() => navigate('/create-post')}>
          <MessageSquare className="mr-2 h-4 w-4" /> Iniciar Nueva Discusión
        </Button>
      </section>

      <section className="space-y-6">
        {mockForums.map((forum, index) => (
          <motion.div
            key={forum.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0,0,0,0.08)"}}
          >
            <Card className="hover:border-primary transition-all">
              <CardHeader>
                <CardTitle className="text-xl hover:text-primary cursor-pointer">{forum.title}</CardTitle>
                <CardDescription>Asignatura: {forum.subject}</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-sky-500" /> {forum.posts} Publicaciones
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-green-500" /> {forum.members} Miembros
                </div>
                <div className="flex items-center col-span-2 md:col-span-1">
                  <ThumbsUp className="h-4 w-4 mr-2 text-yellow-500" /> Última actividad: {forum.lastActivity}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full md:w-auto">Entrar al Foro</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </section>
      {mockForums.length === 0 && (
         <p className="text-center text-muted-foreground py-10">No hay foros disponibles. ¡Crea el primero!</p>
      )}
    </motion.div>
  );
};

export default ForumPage;