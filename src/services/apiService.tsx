import api, { getCsrfToken } from './axios';

export const fetchAuthenticatedUser = async () => {
    try {
      const response = await api.get('/user');
      return response.data;  
    } catch (error) {
      console.error('Error fetching authenticated user:', error);
      throw error; 
    }
  };

export const registerUser = async (userData: any) => {
  return api.post('/register', userData);
};

export const loginUser = async (email: string, password: string) => {
  try {
    await getCsrfToken();
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (e) {
    throw new Error("Invalid credentials, please try again.");
  }
};

export const getGoals = async (className: string) => {
    try {
      const response = await api.get(`/class/${className}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching goals:', error);
      throw new Error('Unable to fetch goals');
    }
};