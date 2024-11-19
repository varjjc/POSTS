import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App', () => {
  it('renderiza la página principal en la ruta "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Verificar que el texto de la página principal está presente
    expect(screen.getByText(/lista de posts/i)).toBeInTheDocument();
  });

  it('renderiza la página de nuevo post en la ruta "/new"', () => {
    render(
      <MemoryRouter initialEntries={['/new']}>
        <App />
      </MemoryRouter>
    );

    // Verificar que el texto de la página de nuevo post está presente
    expect(screen.getByText(/nuevo post/i)).toBeInTheDocument();
  });

  it('renderiza la página de edición en la ruta "/edit/:id"', () => {
    render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <App />
      </MemoryRouter>
    );

    // Verificar que el texto de la página de edición está presente
    expect(screen.getByText(/editar post/i)).toBeInTheDocument();
  });

  it('muestra un error 404 para rutas no definidas', () => {
    render(
      <MemoryRouter initialEntries={['/ruta-inexistente']}>
        <App />
      </MemoryRouter>
    );

    // Verificar que se muestra un mensaje de error para rutas no definidas
    expect(screen.getByText(/error 404/i)).toBeInTheDocument();
  });
});
