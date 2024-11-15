import React, { useEffect, useState } from 'react';
import {  Grid, Typography, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import api from '../../services/axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

interface User {
  id: number;
  name: string;
  email: string;
  class: string[];
}

interface ClassInfo {
  className: string;
  isUnlocked: boolean;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userClasses, setUserClasses] = useState<ClassInfo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/user');
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching goals:', err);
        setError("Unable to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUserClasses = () => {
        try {
          const userClassesFromDb = user.class;
          const classes: ClassInfo[] = [
            { className: '4-5', isUnlocked: userClassesFromDb.includes('class_4-5') },
            { className: '6-8', isUnlocked: userClassesFromDb.includes('class_6-8') },
            { className: '9-10', isUnlocked: userClassesFromDb.includes('class_9-10') },
            { className: '11-12', isUnlocked: userClassesFromDb.includes('class_11-12') },
          ];
          setUserClasses(classes);
        } catch (error) {
          console.error('Error fetching user classes', error);
        }
      };

      fetchUserClasses();
    }
  }, [user]);

  const handleClassClick = (className: string) => {
    if (userClasses.find((c) => c.className === className && c.isUnlocked)) {
      navigate(`/class/${className}`);
    }
  };

  if (loading) {
    return (
      <LoadingSpinner size={44} color="primary.main" />
    );
  }

  return (
    <div>
      <Navbar />
      {error && <p>{error}</p>}
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography gutterBottom sx={{ textTransform: 'capitalize' }}>
        👋 Welcome, {user?.name}
        </Typography>
        <Typography variant="h4" sx={{ mb: 4 }} gutterBottom>
          Select Class Group
        </Typography>
        <hr />
        <Grid container spacing={6} justifyContent="center" sx={{ mt: 1 , mb: 10 }}>
          {userClasses.map((classInfo) => (
            <Grid item key={classInfo.className}>
              <Box
                sx={{
                  position: 'relative',
                  width: 250,
                  height: 250,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '50%',
                  backgroundColor: classInfo.isUnlocked ? 'green' : 'gray',
                  cursor: classInfo.isUnlocked ? 'pointer' : 'not-allowed',
                  boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                }}
                onClick={() => handleClassClick(classInfo.className)}
              >
                {classInfo.isUnlocked ? (
                  <img
                    src="img.png"  
                    alt={classInfo.className}
                    style={{
                      width: '250px',
                      height: '250px',
                      borderRadius:'50%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <LockIcon sx={{ fontSize: 80, color: 'white' }} />
                )}
              </Box>
              <Typography variant="h6" sx={{ marginTop: '10px' }}>
                Class {classInfo.className}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default Dashboard;
