import Footer from './Footer';
import Navbar from './Navbar';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Grid,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { TextFieldComponent } from './common/InputField';
import api from '../services/axios';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import CustomBlinkingCursor from './Home/BlinkingEarthAnimation';
interface FormData {
  name: string;
  contact_no: string;
  email: string;
  subject: string;
  message: string;
  error: {
    name?: string;
    contact_no?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
}
const HeroSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px 20px',
  backgroundColor: 'white',
  borderBottom: '2px solid #e0e0e0',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    padding: '40px',
  },
}));

const HeroContent = styled('div')(({ theme }) => ({
  flex: 1,
  paddingRight: '0',
  animation: 'fadeIn 1s ease-in-out',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    paddingRight: '40px',
    textAlign: 'left',
  },
}));

const HeroImage = styled('img')(() => ({
  width: '100%',
  maxWidth: '500px',
  transition: 'transform 0.3s ease',
  ':hover': {
    transform: 'scale(1.05)',
  },
}));

const Section = styled('section')({
  padding: '60px 20px',
  textAlign: 'center',
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#333',
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
}));

const ContactFormButton = styled(Button)({
  backgroundColor: '#4caf50',
  color: '#fff',
  ':hover': {
    backgroundColor: '#388e3c',
  },
});

function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact_no: '',
    email: '',
    subject: '',
    message: '',
    error: {},
  });

  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      error: {
        ...prevFormData.error,
        [name]: '',
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Partial<FormData['error']> = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.contact_no) errors.contact_no = 'Contact number is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Invalid email format';
      }
    }
    if (!formData.subject) errors.subject = 'Subject is required';
    if (!formData.message) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        error: errors,
      }));
      return;
    }

    try {
      const response = await api.post('contact', formData);
      alert(response.data.message);
      setFormData({
        name: '',
        contact_no: '',
        email: '',
        subject: '',
        message: '',
        error: {},
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("There was an error sending your message. Please try again.");
    }
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ scale: 50 }} animate={{ scale: 1 }}
      >
        <HeroSection>
          <HeroContent  >

            <Typography
              variant={isSmallScreen ? 'h3' : 'h2'}
              style={{ color: '#2e3b55', fontWeight: '700' }}
            >
              <CustomBlinkingCursor />
            </Typography>
            <br />
            <Typography variant="body1" style={{ color: '#5f6368', lineHeight: '1.8' }}>
              Web application designed to facilitate structured tests, user rankings, and certification issuance(Participation and merit certificate). The system will serve four classes, each with multiple goals, tests, and questions. The application includes features like participation and ranking certificates, a leaderboard system, and social media sharing capabilities.

            </Typography>
            <br />
            <Button variant="outlined" size="large" color='primary' onClick={handleStart} >Start Now</Button>
          </HeroContent>
          <HeroImage src="im.jpg" alt="Welcome" className="rotating-image" />

        </HeroSection>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >

        <Section sx={{ backgroundColor: "#002D62", }}>

          <SectionTitle variant="h5" style={{ color: "white" }} >About Us</SectionTitle>

          <Typography variant="body1" style={{ maxWidth: '800px', margin: '0 auto', color: 'white', lineHeight: '1.6' }}>
            We are a team of professionals dedicated to providing quality services and solutions. Our
            focus is on customer satisfaction and continuous improvement.
          </Typography>

        </Section>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Section style={{ marginTop: "50px", marginBottom: "50px" }}>
          <SectionTitle variant="h5">Frequently Asked Questions</SectionTitle>
          {['What is Service 1?', 'How can I get started?', 'D dw'].map((faq, index) => (
            <Accordion key={index} style={{ maxWidth: '1200px', padding: '10px', margin: '10px auto' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  {index + 1}. {faq}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ textAlign: 'left' }}>
                  {index === 0 ? 'Service 1 is designed to help you achieve your goals in a streamlined way.'
                    : index === 1 ? 'Getting started is easy! Just reach out through our contact form below.'
                      : 'Yes, we provide 24/7 support. Contact us anytime!'}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Section>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Section sx={{ backgroundColor: "#fafafa", }}>
          <SectionTitle variant="h5">Contact Us</SectionTitle>
          <Grid container style={{ maxWidth: '800px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Grid item xs={12}>
                <Box mb={2}>
                  <TextFieldComponent
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    label="Name"
                    error={!!formData.error.name}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mb={2}>
                  <TextFieldComponent
                    name="contact_no"
                    value={formData.contact_no}
                    onChange={handleChange}
                    label="Contact No."
                    error={!!formData.error.contact_no}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mb={2}>
                  <TextFieldComponent
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    label="Email"
                    error={!!formData.error.email}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mb={2}>
                  <TextFieldComponent
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    label="Subject"
                    error={!!formData.error.subject}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mb={2}>
                  <TextFieldComponent
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    label="Message"
                    error={!!formData.error.message}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <ContactFormButton type="submit" variant="contained" fullWidth>
                  Send Message
                </ContactFormButton>
              </Grid>
            </form>
          </Grid>
        </Section>

      </motion.div>

      <Footer />
    </div>
  );
}

export default Home;
