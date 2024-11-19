import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PostTable } from '../components/postTable';

describe('PostTable', () => {
  const mockPosts = [
    { id: 1, title: 'Post 1', body: 'Contenido del Post 1' },
    { id: 2, title: 'Post 2', body: 'Contenido del Post 2' },
  ];
  const mockOnDelete = jest.fn();

  it('renderiza una tabla con los posts', () => {
    render(<PostTable posts={mockPosts} onDelete={mockOnDelete} />);

    // Verificar que los títulos y contenidos están presentes
    expect(screen.getByText(/post 1/i)).toBeInTheDocument();
    expect(screen.getByText(/contenido del post 1/i)).toBeInTheDocument();
    expect(screen.getByText(/post 2/i)).toBeInTheDocument();
    expect(screen.getByText(/contenido del post 2/i)).toBeInTheDocument();

    // Verificar que los botones de eliminación están presentes
    const deleteButtons = screen.getAllByRole('button', { name: /eliminar/i });
    expect(deleteButtons).toHaveLength(mockPosts.length);
  });

  it('llama a onDelete con el ID correcto al hacer clic en eliminar', () => {
    render(<PostTable posts={mockPosts} onDelete={mockOnDelete} />);

    const deleteButtons = screen.getAllByRole('button', { name: /eliminar/i });
    fireEvent.click(deleteButtons[0]); // Click en el primer botón de eliminación

    expect(mockOnDelete).toHaveBeenCalledWith(1); // Verificar que se llamó con el ID del primer post
  });
});
