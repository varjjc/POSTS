export const apiClient = {
    get: async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error en la solicitud');
      return response.json();
    },
    post: async (url, data) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error en la solicitud');
      return response.json();
    },
    put: async (url, data) => {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error en la solicitud');
      return response.json();
    },
    delete: async (url) => {
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error en la solicitud');
      return response.json();
    },
  };
  