import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, Search, FileText, BookCopy, Presentation } from 'lucide-react';

const mockContent = [
  { id: 1, title: 'Apuntes de Cálculo I - Semana 5', type: 'PDF', subject: 'Cálculo I', semester: '1', icon: <FileText className="h-6 w-6 text-red-500" /> },
  { id: 2, title: 'Resumen de Programación Orientada a Objetos', type: 'DOCX', subject: 'POO', semester: '2', icon: <BookCopy className="h-6 w-6 text-blue-500" /> },
  { id: 3, title: 'Presentación sobre Estructuras de Datos', type: 'PPTX', subject: 'Estructuras de Datos', semester: '3', icon: <Presentation className="h-6 w-6 text-orange-500" /> },
  { id: 4, title: 'Guía de Laboratorio de Física', type: 'PDF', subject: 'Física I', semester: '1', icon: <FileText className="h-6 w-6 text-red-500" /> },
];

const ExplorePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <header className="text-center py-8 uniforum-gradient-bg text-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold">Explorar Contenido Académico</h1>
        <p className="text-lg mt-2 text-indigo-100">Encuentra recursos compartidos por la comunidad.</p>
      </header>

      <section className="flex flex-col md:flex-row gap-4 items-center p-4 bg-card rounded-lg shadow">
        <div className="relative flex-grow w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Buscar documentos, apuntes, presentaciones..." className="pl-10 w-full" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filtros Avanzados
        </Button>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockContent.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ y: -5, boxShadow: "0px 8px 15px rgba(0,0,0,0.1)"}}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  {item.icon}
                </div>
                <CardDescription>
                  {item.subject} - Semestre {item.semester}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  Este es un {item.type} útil para la asignatura de {item.subject}.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">Ver Detalles</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </section>
      {mockContent.length === 0 && (
        <p className="text-center text-muted-foreground py-10">No hay contenido disponible por el momento. ¡Sé el primero en compartir!</p>
      )}
    </motion.div>
  );
};

export default ExplorePage;