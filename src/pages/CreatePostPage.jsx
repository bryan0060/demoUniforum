import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, FileText, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [semester, setSemester] = useState('');
  const [file, setFile] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [postType, setPostType] = useState('discussion'); // 'discussion' or 'document'
  const { toast } = useToast();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast({
          variant: "destructive",
          title: "Tipo de archivo no permitido",
          description: "Solo se permiten archivos PDF, DOCX, y PPTX.",
        });
        setFile(null);
        e.target.value = null; 
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
         toast({
          variant: "destructive",
          title: "Archivo demasiado grande",
          description: "El tamaño máximo del archivo es 10MB.",
        });
        setFile(null);
        e.target.value = null;
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      const validImages = filesArray.filter(file => allowedTypes.includes(file.type)); // Keep only valid types for processing
      const imagePreviews = [];
      
      if (validImages.length !== filesArray.length) {
         toast({
          variant: "destructive",
          title: "Tipos de archivo no permitidos",
          description: "Solo se permiten archivos de imagen JPG, PNG, GIF, y WEBP.",
        });
      }

      validImages.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          imagePreviews.push({ name: file.name, dataUrl: reader.result });
          if (imagePreviews.length === validImages.length) {
            setSelectedImages(imagePreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({ variant: "destructive", title: "Error", description: "El título es obligatorio." });
      return;
    }
    if (postType === 'discussion' && !content.trim()) {
      toast({ variant: "destructive", title: "Error", description: "El contenido de la discusión es obligatorio." });
      return;
    }
    if (postType === 'document' && !file) {
      toast({ variant: "destructive", title: "Error", description: "Debes seleccionar un archivo para subir." });
      return;
    }
    if (!subject.trim() || !semester.trim()) {
      toast({ variant: "destructive", title: "Error", description: "La materia y el semestre son obligatorios." });
      return;
    }

    console.log({ title, content, subject, semester, file, selectedImages, postType });
    toast({ title: "Éxito", description: `Tu ${postType === 'discussion' ? 'publicación' : 'documento'} ha sido ${postType === 'discussion' ? 'creado' : 'subido'} (simulado).` });
    
    setTitle('');
    setContent('');
    setSubject('');
    setSemester('');
    setFile(null);
    if(document.getElementById('file-upload')) {
      document.getElementById('file-upload').value = null;
    }
    setSelectedImages([]);
    if(document.getElementById('image-upload')) {
      document.getElementById('file-upload').value = null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="shadow-xl">
        <CardHeader className="text-center uniforum-gradient-bg text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Compartir Conocimiento</CardTitle>
          <CardDescription className="text-indigo-100">Crea una nueva publicación o sube un documento.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex gap-2">
            <Button 
              variant={postType === 'discussion' ? 'default' : 'outline'} 
              onClick={() => setPostType('discussion')}
              className="flex-1"
            >
              <FileText className="mr-2 h-4 w-4" /> Crear Discusión
            </Button>
            <Button 
              variant={postType === 'document' ? 'default' : 'outline'} 
              onClick={() => setPostType('document')}
              className="flex-1"
            >
              <UploadCloud className="mr-2 h-4 w-4" /> Subir Documento
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: Dudas sobre la integral definida" required />
            </div>

            {postType === 'discussion' && (
              <div>
                <Label htmlFor="content">Contenido de la Discusión</Label>
                <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escribe aquí tu pregunta o tema de discusión..." rows={5} required />
              </div>
            )}

            {postType === 'document' && (
              <div>
                <Label htmlFor="file-upload">Seleccionar Archivo (PDF, DOCX, PPTX - Máx 10MB)</Label>
                <Input id="file-upload" type="file" onChange={handleFileChange} accept=".pdf,.docx,.pptx" />
                {file && <p className="text-sm text-muted-foreground mt-1">Archivo seleccionado: {file.name}</p>}
              </div>
            )}

            {/* Nuevo campo para adjuntar imágenes */}
            <div>
              <Label htmlFor="image-upload">Adjuntar Fotos (Opcional)</Label>
              <Input id="image-upload" type="file" multiple onChange={handleImageChange} accept=".jpg,.jpeg,.png,.gif,.webp" />
              {/* Mostrar previsualizaciones de imágenes */}
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedImages.map((img) => (
                  <div key={img.name} className="relative">
                    <img src={img.dataUrl} alt={img.name} className="w-24 h-24 object-cover rounded-md shadow-md" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subject">Materia / Asignatura</Label>
                <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Ej: Cálculo I" required />
              </div>
              <div>
                <Label htmlFor="semester">Semestre</Label>
                <Input id="semester" type="number" value={semester} onChange={(e) => setSemester(e.target.value)} placeholder="Ej: 1" min="1" max="10" required />
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" /> {postType === 'discussion' ? 'Publicar Discusión' : 'Subir Documento'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CreatePostPage;