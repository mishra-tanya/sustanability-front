import React, { useState } from 'react';
import Navbar from '.././Navbar';
import Footer from '.././Footer';
import RegistrationForm from './Registration';
import { Container, Card, CardContent, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { Helmet } from 'react-helmet-async';

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
      <br />
      <Helmet>
  <title>Register - Sustainability Olympiad</title>
  <meta name="description" content="Register to take part in the Sustainability Olympiad and become a champion of the 17 SDGs." />
  <meta name="keywords" content="Sustainability Olympiad, Sustainability Test, SDG, UN Goals, IndiaESG, sustainability education, students, grade 4-10, environment, social responsibility, sustainable future, climate change, free olympiad, SDG quiz, sustainability quiz for students" />
</Helmet>
      <div className="center-container" style={ {'display': 'flex',
  'justifyContent': 'center',
 'alignItems': 'center',
  'textAlign': 'center'

            }}>
      <TypeAnimation
        sequence={[
          'Welcome to Sustainability Olympiad',
          2000,
          'Please Register Yourself!!',
          2000,
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: '20px', display: 'inline-block',fontWeight:'bold' }}
        repeat={2}
      />
    </div>
      <Container maxWidth="sm" sx={{ mb: 10, mt: 2, pt: 3, pb: 3, bgcolor: "#e3f2fd" }}>
        <Card variant="outlined" sx={{ width: '100%', padding: 3, }}>
          <CardContent>

            <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>Registration Form</Typography>
           
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
