
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
// Simulación de mockContent (IDEALMENTE IMPORTARÍAS ESTO DE TU FUENTE DE DATOS)
// Asegúrae de que esta estructura coincida con la de tus datos reales
const mockContent = [
  {
    id: 1,
    title: 'Apuntes de Cálculo I - Semana 5',
    type: 'PDF',
    subject: 'Cálculo I',
    semester: '1',
    comments: [
      { id: 101, author: 'Ana Pérez', text: '¡Muy buenos apuntes, gracias por compartir!' },
      { id: 102, author: 'Juan García', text: '¿Alguien sabe si esto entra en el examen parcial?' },
      { id: 103, author: 'María López', text: 'Confirmo, son muy claros y completos.' },
    ],
  },
  {
    id: 2,
    title: 'Resumen de Programación Orientada a Objetos',
    type: 'DOCX',
    subject: 'POO',
    semester: '2',
    comments: [
      { id: 201, author: 'Pedro Ruiz', text: 'Excelente resumen, me ha servido mucho para repasar.' },
      { id: 202, author: 'Laura Jiménez', text: 'Faltaría un poco sobre polimorfismo, ¿no creen?' },
    ],
  },
  {
    id: 3,
    title: 'Presentación sobre Estructuras de Datos',
    type: 'PPTX',
    subject: 'Estructuras de Datos',
    semester: '3',
    comments: [
      { id: 301, author: 'Carlos Sánchez', text: 'La presentación está genial, muy visual.' },
      { id: 302, author: 'Sofía Torres', text: '¿Alguien tiene ejemplos de código para los árboles B?' },
      { id: 303, author: 'Luis Fernández', text: 'Muy buen trabajo, ¡gracias!' },
      { id: 304, author: 'Elena Díaz', text: 'Me gustaría ver una parte sobre grafos también.' },
    ],
  },
  {
    id: 4,
    title: 'Guía de Laboratorio de Física',
    type: 'PDF',
    subject: 'Física I',
    semester: '1',
    comments: [], // Esta publicación no tiene comentarios por ahora
  },
];
const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    // Simular carga de datos (reemplazar con tu lógica de carga real)
    const foundPost = mockContent.find(item => item.id === parseInt(postId));
    if (foundPost) {
      // Simular un pequeño retraso para la carga
      setTimeout(() => {
        setPost(foundPost);
      }, 500); // Retraso de 500ms
    } else {
      setPost(null); // O podrías establecer un estado de error
    }
  }, [postId]); // Ejecutar cada vez que postId cambie

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim() || !post) {
      // No agregar comentario si está vacío o si la publicación no está cargada
      return;
    }

    const newComment = {
      // Simular un ID simple (en un caso real, lo generaría el backend)
      id: Date.now(),
      author: 'Usuario Actual', // Simular el autor
      text: newCommentText.trim(),
    };

    setPost({ ...post, comments: [...(post.comments || []), newComment] });
    setNewCommentText(''); // Limpiar la textarea
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <header className="text-center py-8 uniforum-gradient-bg text-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold">Detalles de la Publicación</h1>
        <p className="text-lg mt-2 text-indigo-100">Aquí verás la información completa de la publicación.</p>
      </header>

      <section className="p-4 bg-card rounded-lg shadow">
        {/* Lógica para mostrar la publicación cargada o mensaje de estado */}
        {post ? (
          <>
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-muted-foreground mt-1">
              Tipo: {post.type} | Asignatura: {post.subject}
            </p>
            {/* Aquí puedes añadir más detalles de la publicación si están disponibles en tus datos */}
            <div className="mt-4">
              {/* Contenido detallado de la publicación, por ejemplo, un visor de PDF, texto, etc. */}
              <p>Contenido detallado de la publicación con ID: {post.id} iría aquí.</p>
              {/* Esto es un placeholder. Reemplázalo con el contenido real. */}
            </div>
          </>
        ) : (
          <p className="text-center text-muted-foreground">Cargando detalles o Publicación no encontrada...</p>
        )}
      </section>

      {/* Sección de Comentarios */}
      <section className="p-4 bg-card rounded-lg shadow mt-8">
        <h3 className="text-xl font-semibold mb-4">Comentarios</h3>
        {post && post.comments && post.comments.length > 0 ? (
          post.comments.map(comment => (
            <div key={comment.id} className="mb-4 pb-4 border-b last:border-b-0">
              <p className="text-sm font-semibold text-gray-700">{comment.author}</p>
              <p className="text-gray-600">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">Cargando detalles o Publicación no encontrada...</p>
        )}
      </section>

      {/* Formulario para añadir un nuevo comentario */}
      {post && (
        <section className="p-4 bg-card rounded-lg shadow mt-4">
          <h3 className="text-xl font-semibold mb-4">Añadir un Comentario</h3>
          <form onSubmit={handleAddComment} className="space-y-4">
            <div>
              <Label htmlFor="new-comment">Tu Comentario</Label>
              <Textarea id="new-comment" value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} placeholder="Escribe tu comentario aquí..." rows={3} />
            </div>
            <Button type="submit">Publicar Comentario</Button>
          </form>
        </section>
      )}
    </motion.div>
  );
};

export default PostDetailPage;