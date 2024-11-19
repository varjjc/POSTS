import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PostForm } from '../components/postForm';

describe('PostForm', () => {
  const mockOnSubmit = jest.fn();

  it('renderiza los campos de entrada y el botón', () => {
    render(<PostForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contenido/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /guardar/i })).toBeInTheDocument();
  });

  it('envía los datos correctamente al hacer clic en Guardar', () => {
    render(<PostForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Mi Título' } });
    fireEvent.change(screen.getByLabelText(/contenido/i), { target: { value: 'Mi Contenido' } });

    fireEvent.click(screen.getByRole('button', { name: /guardar/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({ title: 'Mi Título', body: 'Mi Contenido' });
  });
});
