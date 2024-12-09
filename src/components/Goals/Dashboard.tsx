import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Avatar } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import api from '../../services/axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import PersonIcon from '@mui/icons-material/Person';

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
      <Box sx={{ backgroundColor: '#0f2b3c', p: { xs: 2, md: 1 }, pl: { xs: 0, md: 10 } }}>
  <Grid container spacing={2} alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }}>
    {/* First Column with User Icon */}
    <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
      <Avatar sx={{ width: { xs: 200, md: 190 }, height: { xs: 200, md: 190 }, bgcolor: "#243947" }}>
        <Avatar sx={{ width: { xs: 160, md: 160 }, height: { xs: 160, md: 160 }, bgcolor: "#2f4350" }}>
          <Avatar sx={{ width: { xs: 120, md: 130 }, height: { xs: 120, md: 130 }, bgcolor: "#263238" }}>
            <PersonIcon sx={{ fontSize: { xs: 90, md: 110 } }} />
          </Avatar>
        </Avatar>
      </Avatar>
    </Grid>

    {/* Second Column with User Information */}
    <Grid item xs={12} md={8} sx={{ textAlign: { xs: 'center', md: 'left' }}}>
      <Typography variant="h3" gutterBottom sx={{ textTransform: 'capitalize',color: 'white', fontWeight: 'bold', fontSize: '38px', pl:{md:5}  }}>
        {user?.name}
      </Typography>
      <Typography gutterBottom sx={{ color: 'white', fontWeight: 'bold', fontSize: '18px', pl:{md:5}  }}>
        {user?.email}
      </Typography>
      <Typography variant="h6" sx={{  color: 'white', pl:{md:5},fontWeight:"bolder"  }} gutterBottom>
        Sustainability Olympiad
      </Typography>
      <Typography  sx={{ color: 'grey', pl:{md:5},fontWeight:"bolder",fontSize:"15px" }} gutterBottom>
        Total Four Class Goals
      </Typography>
    </Grid>
  </Grid>
</Box>


      <Box sx={{ textAlign: 'center', p: { xs: 2, md: 3 } }}>
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
