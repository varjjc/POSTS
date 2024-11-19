import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HomePage } from '../pages/homePage';
import { MemoryRouter } from 'react-router-dom';
import { postService } from '../services/postService';

jest.mock('../services/postService', () => ({
  getPosts: jest.fn((page, limit) => {
    const posts = Array.from({ length: limit }, (_, i) => ({
      id: (page - 1) * limit + i + 1,
      title: `Post ${i + 1}`,
      body: `Contenido del Post ${i + 1}`,
    }));
    return Promise.resolve(posts);
  }),
}));

describe('HomePage', () => {
  it('renderiza correctamente los posts en la primera página', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Verificar que los posts de la primera página se renderizan
    expect(await screen.findByText(/post 1/i)).toBeInTheDocument();
    expect(screen.getByText(/post 10/i)).toBeInTheDocument();
  });

  it('muestra posts diferentes al cambiar de página', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Esperar que los posts de la primera página se carguen
    expect(await screen.findByText(/post 1/i)).toBeInTheDocument();

    // Simular cambio de página
    fireEvent.click(screen.getByRole('button', { name: '2' })); // Hacer clic en la página 2

    // Verificar que los posts de la segunda página se renderizan
    expect(await screen.findByText(/post 11/i)).toBeInTheDocument();
    expect(screen.getByText(/post 20/i)).toBeInTheDocument();
  });
});
