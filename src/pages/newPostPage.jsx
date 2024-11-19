import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostForm } from '../components/postForm';
import { postService } from '../services/postService';
import { Container, Button, Card, CardContent, Typography, Box } from '@mui/material';

export const NewPostPage = () => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState(null); // Datos del nuevo post para vista previa

  // Manejar la creación del nuevo post
  const handleSubmit = async (postData) => {
    try {
      const createdPost = await postService.createPost(postData); // Guardar el nuevo post en la API
      setNewPost(createdPost); // Actualizar la vista previa con el nuevo post
      alert('Post creado con éxito.');
    } catch (error) {
      alert('Error al crear el post.');
    }
  };

  return (
    <Container>
      <h1>Nuevo Post</h1>
      <PostForm onSubmit={handleSubmit} />
      
      {/* Botón para navegar a la página principal */}
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        <Button variant="contained" color="secondary" onClick={() => navigate('/')}>
          Volver a la Página Principal
        </Button>
      </Box>

      {/* Vista previa del post creado */}
      {newPost && (
        <Card sx={{ marginTop: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Vista Previa del Nuevo Post
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Título:</strong> {newPost.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Contenido:</strong> {newPost.body}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};
