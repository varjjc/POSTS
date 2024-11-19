import React, { useState, useEffect } from 'react';
import { PostTable } from '../components/postTable';
import { postService } from '../services/postService';
import { ModalNotification } from '../components/modalNotification';
import { Container, Button, Pagination, Box } from '@mui/material';

export const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [notification, setNotification] = useState('');
  const [page, setPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(0); // Total de páginas

  const POSTS_PER_PAGE = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getPosts(page, POSTS_PER_PAGE);
        setPosts(data);
        // Simular total de páginas ya que la API no devuelve este valor
        setTotalPages(Math.ceil(100 / POSTS_PER_PAGE)); // La API tiene 100 posts fijos
      } catch (error) {
        console.error('Error al cargar los posts:', error);
      }
    };
    fetchPosts();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await postService.deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
      setNotification('Post eliminado con éxito.');
    } catch (error) {
      setNotification('Error al eliminar el post.');
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value); // Cambiar a la nueva página
  };

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        href="/new"
        sx={{ marginBottom: 2 }}
      >
        Nuevo Post
      </Button>
      <PostTable posts={posts} onDelete={handleDelete} />
      {/* Paginación */}
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      <ModalNotification
        open={!!notification}
        message={notification}
        onClose={() => setNotification('')}
      />
    </Container>
  );
};
