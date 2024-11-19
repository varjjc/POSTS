import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/homePage';
import { NewPostPage } from './pages/newPostPage';
import { EditPostPage } from './pages/editPostPage';
import { CssBaseline, AppBar, Toolbar, Typography, Container } from '@mui/material';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Gestión de Posts
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<NewPostPage />} />
          <Route path="/edit/:id" element={<EditPostPage />} />
          <Route path="*" element={<h1>Error 404: Página no encontrada</h1>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
