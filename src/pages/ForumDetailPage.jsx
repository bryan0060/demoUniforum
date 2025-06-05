import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { mockForums } from '@/pages/ForumPage'; // Assuming mockForums is exported from ForumPage.jsx

// Mock data for posts within these forums
const mockPosts = [
  { id: 'post-1', forumId: '1', author: 'Estudiante A', content: 'Tengo una duda con la regla de la cadena en funciones de varias variables. ¿Alguien podría ayudarme?', createdAt: '2023-11-01T09:00:00Z' },
  { id: 'post-2', forumId: '1', author: 'Profesor Sánchez', content: 'Claro, Estudiante A. ¿Podrías especificar qué parte te causa confusión? Podemos revisarlo con un ejemplo.', createdAt: '2023-11-01T09:30:00Z' },
  { id: 'post-3', forumId: '2', author: 'Estudiante B', content: '¿Alguien ha tenido problemas implementando la herencia múltiple en el proyecto final de POO?', createdAt: '2023-11-01T10:00:00Z' },
  { id: 'post-4', forumId: '2', author: 'Estudiante C', content: 'Sí, tuve un error de ambigüedad con los métodos. Lo resolví reestructurando las interfaces.', createdAt: '2023-11-01T10:15:00Z' },
  { id: 'post-5', forumId: '3', author: 'Estudiante D', content: '¿Cuál es la complejidad del algoritmo QuickSort en el peor caso y cómo afecta a la elección del pivote?', createdAt: '2023-11-01T11:00:00Z' },
  { id: 'post-6', forumId: '3', author: 'Profesora Gómez', content: 'Excelente pregunta. La complejidad es O(n^2) en el peor caso, que ocurre con selecciones de pivote desafortunadas (como elegir siempre el elemento más pequeño o más grande). Estrategias como el pivote aleatorio o la mediana de tres ayudan a mitigar esto.', createdAt: '2023-11-01T11:30:00Z' },
];


const ForumDetailPage = () => {
  const { forumId } = useParams();

  const [forumDetails, setForumDetails] = useState(null);
  const [forumPosts, setForumPosts] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    console.log('ForumDetailPage: useEffect running for forumId:', forumId);
    // Find the forum details based on the forumId from the URL
    const foundForum = mockForums.find(forum => forum.id.toString() === forumId);
    console.log('ForumDetailPage: foundForum:', foundForum);
    setForumDetails(foundForum);
    console.log('ForumDetailPage: forumDetails state after set:', forumDetails); // Note: This will log the *previous* state due to closure

    // Filter posts related to the found forum
    const filteredPosts = mockPosts.filter(post => post.forumId === forumId);
    console.log('ForumDetailPage: filteredPosts length:', filteredPosts.length);
    setForumPosts(filteredPosts);

  }, [forumId]); // Rerun this effect when forumId changes

  const handlePostComment = () => {
    if (newComment.trim() && forumDetails) {
      console.log('Simulating posting comment:', newComment);
      // In a real app, you would send this to a backend and update the UI
      setNewComment('');
    }
  };

  if (!forumDetails) {
    console.log('ForumDetailPage: Not rendering details, forumDetails is null');
    return <div className="text-center py-10">Cargando detalles del foro o foro no encontrado...</div>;
  }

  return (
    <div className="space-y-6 p-4">
      {/* Forum Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{forumDetails.title}</CardTitle>
          <p className="text-muted-foreground">Asignatura: {forumDetails.subject}</p>
          {/* You might add a description here if mockForums had a description property */}
          {/* <p className="text-muted-foreground mt-2">{forumDetails.description}</p> */}
        </CardHeader>
      </Card>

      {/* Posts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Publicaciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {forumPosts.length === 0 ? ( 
            <p className="text-muted-foreground">No hay publicaciones en este foro aún. ¡Sé el primero en participar!</p>
          ) : (
            forumPosts.map(post => ( 
              <Card key={post.id} className="bg-secondary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span className="font-semibold text-primary">{post.author}</span>
                    {/* Basic date formatting for example */}
                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                  </div>
                  <p>{post.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>

      {/* Add Comment Section */ }
      <Card>
        <CardHeader>
          <CardTitle>Participa en la Discusión</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Escribe tu comentario o pregunta aquí..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
          />
          <Button onClick={handlePostComment}>Publicar</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForumDetailPage;