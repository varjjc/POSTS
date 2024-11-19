import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostForm } from '../components/postForm';
import { postService } from '../services/postService';
import { Container, Button, Card, CardContent, Typography, Box } from '@mui/material';

export const EditPostPage = () => {
  const { id } = useParams(); // Obtener el ID del post de la URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // Datos del post inicial
  const [editedPost, setEditedPost] = useState(null); // Datos del post editado

  // Cargar el post inicial al montar el componente
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPosts(1, 100); // Simular cargar todos para encontrar el post
        const selectedPost = data.find((p) => p.id === parseInt(id));
        setPost(selectedPost);
        setEditedPost(selectedPost);
      } catch (error) {
        console.error('Error al cargar el post:', error);
      }
    };
    fetchPost();
  }, [id]);

  // Manejar la edición del post
  const handleSubmit = async (updatedPost) => {
    try {
      setEditedPost({ ...post, ...updatedPost }); // Actualizar vista previa localmente
      await postService.updatePost(id, updatedPost); // Guardar cambios en la API
      alert('Post actualizado con éxito.');
    } catch (error) {
      alert('Error al actualizar el post.');
    }
  };

  if (!post) {
    return <Container>Cargando post...</Container>;
  }

  return (
    <Container>
      <h1>Editar Post</h1>
      <PostForm onSubmit={handleSubmit} initialData={post} />
      
      {/* Botón para navegar a la página principal */}
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        <Button variant="contained" color="secondary" onClick={() => navigate('/')}>
          Volver a la Página Principal
        </Button>
      </Box>

      {/* Vista previa del post editado */}
      {editedPost && (
        <Card sx={{ marginTop: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Vista Previa del Post Editado
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Título:</strong> {editedPost.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Contenido:</strong> {editedPost.body}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};
