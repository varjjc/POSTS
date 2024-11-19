import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NewPostPage } from '../pages/newPostPage';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../services/postService', () => ({
  createPost: jest.fn(() => Promise.resolve({ id: 101, title: 'Nuevo Post', body: 'Contenido Nuevo' })),
}));

describe('NewPostPage', () => {
  it('permite crear un nuevo post y muestra la vista previa', async () => {
    render(
      <MemoryRouter>
        <NewPostPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Nuevo Post' } });
    fireEvent.change(screen.getByLabelText(/contenido/i), { target: { value: 'Contenido Nuevo' } });

    fireEvent.click(screen.getByRole('button', { name: /guardar/i }));

    expect(await screen.findByText(/vista previa del nuevo post/i)).toBeInTheDocument();
    expect(screen.getByText(/título: nuevo post/i)).toBeInTheDocument();
    expect(screen.getByText(/contenido: contenido nuevo/i)).toBeInTheDocument();
  });
});
