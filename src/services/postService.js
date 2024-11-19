import { apiClient } from './apiClient';
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const postService = {
  getPosts: (page, limit) => apiClient.get(`${BASE_URL}?_page=${page}&_limit=${limit}`),
  createPost: (post) => apiClient.post(BASE_URL, post),
  updatePost: (id, post) => apiClient.put(`${BASE_URL}/${id}`, post),
  deletePost: (id) => apiClient.delete(`${BASE_URL}/${id}`),
};
