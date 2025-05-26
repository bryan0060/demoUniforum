import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { BookOpen, MessageSquare, UploadCloud, PlusCircle } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <section className="text-center py-12 uniforum-gradient-bg text-white rounded-lg shadow-xl">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-5xl font-bold mb-4"
        >
          Bienvenido a UniForum
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
          className="text-xl text-indigo-100 max-w-2xl mx-auto"
        >
          Tu espacio colaborativo para el conocimiento académico en la Corporación Universitaria Lasallista.
        </motion.p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center uniforum-text-gradient">¿Qué puedes hacer?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.custom
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
            className="w-full"
          >
            <Card className="h-full flex flex-col">
              <CardHeader className="items-center">
                <BookOpen className="h-12 w-12 text-primary mb-2" />
                <CardTitle className="text-center">Explorar Contenido</CardTitle>
                <CardDescription className="text-center">
                  Busca y accede a apuntes, documentos y discusiones de tus asignaturas.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  Filtra por materia, semestre o tipo de recurso para encontrar exactamente lo que necesitas.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => navigate('/explore')}>Explorar ahora</Button>
              </CardFooter>
            </Card>
          </motion.custom>

          <motion.custom
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
            className="w-full"
          >
            <Card className="h-full flex flex-col">
              <CardHeader className="items-center">
                <MessageSquare className="h-12 w-12 text-primary mb-2" />
                <CardTitle className="text-center">Participar en Foros</CardTitle>
                <CardDescription className="text-center">
                  Comparte tus dudas, responde a compañeros y debate sobre temas académicos.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  Comenta, valora y enriquece las discusiones para un aprendizaje colaborativo.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => navigate('/forums')}>Ir a los foros</Button>
              </CardFooter>
            </Card>
          </motion.custom>

          <motion.custom
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
            className="w-full"
          >
            <Card className="h-full flex flex-col">
              <CardHeader className="items-center">
                <UploadCloud className="h-12 w-12 text-primary mb-2" />
                <CardTitle className="text-center">Compartir Conocimiento</CardTitle>
                <CardDescription className="text-center">
                  Sube tus propios documentos, apuntes y crea publicaciones útiles.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  Ayuda a tus compañeros y contribuye al crecimiento de la comunidad UniForum.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => navigate('/create-post')}>Subir o Crear</Button>
              </CardFooter>
            </Card>
          </motion.custom>
        </div>
      </section>
      
      <section className="text-center py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">¿Listo para empezar?</h2>
          <Button size="lg" variant="outline" onClick={() => navigate('/create-post')}>
            <PlusCircle className="mr-2 h-5 w-5" />
            Crear una nueva publicación
          </Button>
        </motion.div>
      </section>

    </motion.div>
  );
};

export default HomePage;