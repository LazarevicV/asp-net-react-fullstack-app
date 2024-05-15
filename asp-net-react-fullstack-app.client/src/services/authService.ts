import axios from 'axios';

const API_URL = '/auth';

const authService = {
  login: async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post<{ token: string }>(`${API_URL}/login`, { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },

  logout: (): void => {
    localStorage.removeItem('token');
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    return !!token; // Convert token to boolean
  }
};

export default authService;
