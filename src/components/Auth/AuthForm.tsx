import React, { useState } from 'react';
import Navbar from '.././Navbar';
import Footer from '.././Footer';
import RegistrationForm from './Registration';
import { Container, Card, CardContent, Typography ,Link} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface FormState {
  name: string;
  email: string;
  password: string;
  country: string;
  address: string;
  school: string;
  className: string;
  message: string;
  errors: {
    name?: string;
    email?: string;
    password?: string;
    country?: string;
    address?: string;
    school?: string;
    className?: string;
  };
}

const AuthForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '', email: '', password: '', country: '', address: '', school: '', className: '', message: '', errors: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mb: 10 ,mt:2}}>
        <Card variant="outlined" sx={{ width: '100%', padding: 3 }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>Registration Form</Typography>
            <RegistrationForm formState={formState} setFormState={setFormState} isLoading={isLoading} setIsLoading={setIsLoading} />
          </CardContent>
          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account? <Link component={RouterLink} to="/login" underline="hover" color="primary">Login here</Link>
          </Typography>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default AuthForm;
