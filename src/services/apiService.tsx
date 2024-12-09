import api, { getCsrfToken } from './axios';

// fetch user 
export const fetchAuthenticatedUser = async () => {
    try {
      const response = await api.get('/user');
      return response.data;  
    } catch (error) {
      console.error('Error fetching authenticated user:', error);
      throw error; 
    }
  };

  // registeration
export const registerUser = async (userData: any) => {
  return api.post('/register', userData);
};

// login
export const loginUser = async (email: string, password: string) => {
  try {
    await getCsrfToken();
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (e) {
    throw new Error("Invalid credentials, please try again.");
  }
};

// fetching goal
export const getGoals = async (className: string) => {
    try {
      const response = await api.get(`/class/${className}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching goals:', error);
      throw new Error('Unable to fetch goals');
    }
};

// fetching dashborad classwise data
export const fetchOverallData = async ()  => {
  try {
      const response = await api.get('/getByClass'); 
      // console.log(response.data); 
      return response.data;
  } catch (error) {
      console.error('Error fetching overall data:', error);
      throw error;
  }
};

export const fetchOverallDashData = async ()  => {
  try {
      const response = await api.get('/getOverall'); 
      // console.log(response.data); 
      return response.data;
  } catch (error) {
      console.error('Error fetching overall data:', error);
      throw error;
  }
};
