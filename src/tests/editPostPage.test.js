import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditPostPage } from '../pages/editPostPage';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../services/postService', () => ({
  getPosts: jest.fn(() => Promise.resolve([{ id: 1, title: 'Post Inicial', body: 'Contenido Inicial' }])),
  updatePost: jest.fn(() => Promise.resolve()),
}));

describe('EditPostPage', () => {
  it('renderiza el formulario con datos iniciales', async () => {
    render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <EditPostPage />
      </MemoryRouter>
    );

    expect(await screen.findByLabelText(/título/i)).toHaveValue('Post Inicial');
    expect(await screen.findByLabelText(/contenido/i)).toHaveValue('Contenido Inicial');
  });

  it('muestra la vista previa al editar el post', async () => {
    render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <EditPostPage />
      </MemoryRouter>
    );

    fireEvent.change(await screen.findByLabelText(/título/i), { target: { value: 'Título Editado' } });
    fireEvent.change(screen.getByLabelText(/contenido/i), { target: { value: 'Contenido Editado' } });

    fireEvent.click(screen.getByRole('button', { name: /guardar/i }));

    expect(await screen.findByText(/vista previa del post editado/i)).toBeInTheDocument();
    expect(screen.getByText(/título: título editado/i)).toBeInTheDocument();
    expect(screen.getByText(/contenido: contenido editado/i)).toBeInTheDocument();
  });
});
