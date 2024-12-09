import api from "./axios";

export const handleLogout = async (onSuccess: () => void, onError: (error: any) => void) => {
  try {
    await api.get('/sanctum/csrf-cookie', { withCredentials: true });
    
    await api.post('/logout', {}, { withCredentials: true });
    
    localStorage.removeItem('authToken');
    onSuccess();

  } catch (error) {
    console.error('Logout failed:', error);
    onError(error);
  }
};


const checkTokenExpiry = () => {
  const expiryTime = localStorage.getItem('authTokenExpiry');
  
  if (expiryTime && Date.now() > parseInt(expiryTime)) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiry');
    console.log('Auth token expired and removed');
  }
};

checkTokenExpiry();
