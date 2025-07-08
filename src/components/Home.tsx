import Footer from './Footer';
import Navbar from './Navbar';
import { categorizedFAQs } from './data/faqList';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Container, styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { TextFieldComponent } from './common/InputField';
import api from '../services/axios';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import CustomBlinkingCursor from './Home/BlinkingEarthAnimation';
import VerticalLinearStepper from './Home/Stepper';
import AchieversGallery from './AcheiversGallery';
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
  backgroundColor: '#002D62',
  color: '#fff',
  ':hover': {
    backgroundColor: '#1a478f',
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
            <Typography variant="body1" style={{ color: '#5f6368',textAlign: 'justify' , lineHeight: '1.8' }}>
              Empowering Young Minds for a Sustainable Future
              Are you ready to become a Sustainability Champion? Join thousands of students
              across the world in an exciting journey to understand the United Nation&#39;s Sustainable
              Development Goals (SDGs) and how you can make a difference in the world!
            </Typography>
            <br />
            <Button variant="outlined" size="large" color='primary' onClick={handleStart} >Start Now</Button>
          </HeroContent>
          <HeroImage src="im.jpg" alt="Welcome" className="rotating-image" />

        </HeroSection>
      </motion.div>

      <Section sx={{   py: 8 }}>
          <SectionTitle
            variant="h3"
            sx={{
              fontSize: { xs: '32px', md: '48px' },
              textAlign: 'center'
            }}
          >
            Acheivers Gallery
          </SectionTitle>

<AchieversGallery/>
        </Section>

      {/* about  */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Section sx={{ backgroundColor: "#002D62",  py: 8 }}>
          <SectionTitle
            variant="h3"
            sx={{
              fontSize: { xs: '32px', md: '48px' },
              color: 'white',
              mb: 4,
              textAlign: 'center'
            }}
          >
            About the Sustainability Olympiad
          </SectionTitle>

          {[
            {
              title: "Our Vision",
              text: `To cultivate a generation of environmentally conscious, socially responsible young citizens equipped with the knowledge and passion to create a sustainable future.`
            },
            {
              title: "Our Mission",
              text: `The Sustainability Olympiad aims to make the UN's 17 Sustainable Development Goals accessible, understandable, and actionable for students across India. By providing engaging assessments and recognition for achievement, we seek to inspire young minds to become sustainability champions in their schools, homes, and communities.`
            },
            {
              title: "Our Story",
              text: `The Sustainability Olympiad was born from a simple observation: while sustainability is one of the most critical challenges of our time, it remains insufficiently addressed in standard educational curricula. Launched by IndiaESG.org in 2024, the Olympiad bridges this gap by offering a structured, engaging approach to sustainability education that complements classroom learning.
              Our team of educators, sustainability experts, and educational psychologists has designed an assessment framework that not only tests knowledge but nurtures curiosity and inspires action. We believe that understanding precedes change, and our goal is to help students understand sustainability in ways that are meaningful to their daily lives and future aspirations.
              `
            }
          ].map((section, idx) => (
            <Box key={idx} sx={{ maxWidth: 800, mx: 'auto', mb: 5, px: 2 }}>
              <Typography variant="h6" sx={{ color: '#a5d6ff', textDecoration: 'underline', mb: 1 }}>
                <b>{section.title}</b>
              </Typography>
              <Typography variant="body1" sx={{ color: 'white', textAlign: 'justify' }}>
                {section.text}
              </Typography>
            </Box>
          ))}
        </Section>
      </motion.div>


 <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Section sx={{ backgroundColor: "white",  py: 8 }}>
          <SectionTitle
            variant="h3"
            sx={{
              fontSize: { xs: '32px', md: '48px' },
              color: 'black',
              mb: 4,
              textAlign: 'center'
            }}
          >
           What is the Sustainability Olympiad?
          </SectionTitle>

    
            <Box sx={{ maxWidth: 800, mx: 'auto', mb: 5, px: 2 }}>
              <Typography variant="h6" sx={{ color: 'grey',  mb: 1 }}>
                The Sustainability Olympiad is an innovative <b> FREE</b> educational <br/>
                initiative by <b>IndiaESG.org </b>
                <br/>designed to inspire students from 
                grades 4 to 10 to explore, understand, and engage with global 
                sustainability challenges through fun, interactive assessments
                 aligned with the 17 UN Sustainable Development Goals.
              </Typography>
             
            </Box>

        </Section>
      </motion.div>

      
<motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Section sx={{ backgroundColor: "#f2f6fc",  py: 8 }}>
          <SectionTitle
            variant="h3"
            sx={{
              fontSize: { xs: '32px', md: '48px' },
              color: 'black',
              mb: 4,
              textAlign: 'center',
              textDecoration:'underline'
            }}
          >
           How It Works

          </SectionTitle>

    
           <VerticalLinearStepper/>
            
        </Section>
      </motion.div>



<motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Section sx={{ backgroundColor: "#fff",  py: 8 }}>
          <SectionTitle
            variant="h3"
            sx={{
              fontSize: { xs: '32px', md: '48px' },
              color: 'black',
              mb: 4,
              textAlign: 'center'
            }}
          >
           Why Participate?
          </SectionTitle>

    
            <Box sx={{ maxWidth: 800, mx: 'auto', mb: 5, px: 2 }}>
              <Typography variant="h6" sx={{ color: 'grey',  mb: 1 }}>
                <li>Learn about critical global challenges and solutions</li>
                <li>Earn certificates for each completed SDG </li>
                <li>Share your achievements with friends and family</li>
                <li>Apply sustainability concepts in your academics and daily life</li>
                <li>Join a community of young change-makers</li>
              </Typography>
             
            </Box>
            
        </Section>
      </motion.div>

<motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Section sx={{ backgroundColor: "#f2f6fc",  py: 8 }}>
          <SectionTitle
            variant="h3"
            sx={{
              fontSize: { xs: '32px', md: '48px' },
              color: 'black',
              mb: 4,
              textAlign: 'center',
              textDecoration:'underline'
            }}
          >
         What Makes Us Different?


          </SectionTitle>

      <Box sx={{ maxWidth: 800, mx: 'auto', mb: 5, px: 2 }}>
              <Typography variant="h6" sx={{ color: 'grey',textAlign:'justify',  mb: 1 }}>
                <ul>
                  <li> <b>Comprehensive Coverage: </b>Tests across all 17 UN Sustainable Development Goals</li>
                <li><b>Age-Appropriate Content:</b> Tailored assessments for grades 4 through 10</li>
                <li><b>Application-Focused: </b>Emphasis on practical understanding and real-world relevance</li>
                <li><b>Recognition System: </b>Certificates for each completed SDG to track and celebrate progress</li>
                <li><b>Accessibility:</b> Digital platform accessible to schools across India</li>
              
                </ul>
              </Typography>
             
            </Box>
            
        </Section>
      </motion.div>


 <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Section sx={{ backgroundColor: "white",  py: 8 }}>
          <SectionTitle
            variant="h3"
            sx={{
              fontSize: { xs: '32px', md: '48px' },
              color: 'black',
              mb: 4,
              textAlign: 'center'
            }}
          >
           About IndiaESG.org

          </SectionTitle>

    
            <Box sx={{ maxWidth: 800, mx: 'auto', mb: 5, px: 2 }}>
              <Typography variant="h6" sx={{ color: 'grey',  mb: 1 }}>
              IndiaESG.org is a not-for-profit organization<br/> dedicated to 
              advancing sustainability awareness and action across India. <br/>
              Through educational initiatives, community engagement, and 
              resource development.<br/><br/> We work to make <br/>Environmental, Social,
               and Governance (ESG) principles understood and implemented
                by organizations, communities, and individuals throughout
                 the country.<br/><br/>
              The Sustainability Olympiad represents our flagship
              educational initiative, embodying our belief that meaningful
               change begins with education and awareness among the youngest
                members of our society.

              </Typography>
             
            </Box>

        </Section>
      </motion.div>
     
      <Box sx={{ backgroundColor: "#002D62", py: 8 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
               color: 'white',
              mb: 6,
            }}
          >
            Frequently Asked Questions
          </Typography>

          {categorizedFAQs.map((section, secIndex) => (
            <Box key={secIndex} sx={{ mb: 6 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  mb: 2,
                  borderLeft: `5px solid ${theme.palette.primary.main}`,
                  pl: 2,
                }}
              >
                {section.category}
              </Typography>

              {section.items.map((faq, index) => (
                <Accordion
                  key={index}
                  sx={{
                    mb: 1.5,
                    borderRadius: 2,
                    boxShadow: 1,
                    bgcolor: 'white',
                    '&:before': { display: 'none' },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
                    <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}

              {secIndex !== categorizedFAQs.length - 1 && (
                <Divider sx={{ mt: 4 }} />
              )}
            </Box>
          ))}
        </Container>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Section >
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
