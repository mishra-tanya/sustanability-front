// Importing necessary dependencies
import Footer from './Footer';
import Navbar from './Navbar';
// import './styles/home.css';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';

// Styled components
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

const HeroImage = styled('img')(({ theme }) => ({
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

const ServiceCard = styled(Card)({
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  ':hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
  },
});

const ContactFormButton = styled(Button)({
  backgroundColor: '#4caf50',
  color: '#fff',
  ':hover': {
    backgroundColor: '#388e3c',
  },
});

// Main Home component
function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <Typography variant={isSmallScreen ? 'h3' : 'h2'}gutterBottom style={{ color: '#2e3b55', fontWeight: '700' }}>
            Welcome to Sustainability Olympiad
          </Typography>
          <Typography variant="body1" style={{ color: '#5f6368', lineHeight: '1.8' }}>
          web application designed to facilitate structured tests, user rankings, and certification issuance(Participation and merit certificate). The system will serve four classes, each with multiple goals, tests, and questions. The application includes features like participation and ranking certificates, a leaderboard system, and social media sharing capabilities.
 

          </Typography>
        </HeroContent>
        <HeroImage src="im.jpg" alt="Welcome" className="rotating-image"/>
      </HeroSection>

      {/* About Section */}
      <Section>
        <SectionTitle variant="h5">About Us</SectionTitle>
        <Typography variant="body1" style={{ maxWidth: '800px', margin: '0 auto', color: '#757575', lineHeight: '1.6' }}>
          We are a team of professionals dedicated to providing quality services and solutions. Our
          focus is on customer satisfaction and continuous improvement.
        </Typography>
      </Section>

      {/* Services Section */}
      <Section>
        <SectionTitle variant="h5">Our Services</SectionTitle>
        <Grid container spacing={3} justifyContent="center">
          {['Service 1', 'Service 2', 'Service 3','Service4'].map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ServiceCard>
               
                <CardContent>
                  <Typography variant="h6" gutterBottom>{service}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Detailed description of {service}, explaining the benefits and unique value we
                    offer in this area.
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* FAQ Section */}
      <Section style={{ backgroundColor: '#F8F8F8',marginTop:"50px",marginBottom:"50px" }}>
        <SectionTitle variant="h5">Frequently Asked Questions</SectionTitle>
        {['What is Service 1?', 'How can I get started?', 'Do you offer customer support?'].map((faq, index) => (
          <Accordion key={index} style={{ maxWidth: '1200px', padding:'10px',margin: '10px auto' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {index+1}. {faq}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{textAlign:'left'}}>
                {index === 0 ? 'Service 1 is designed to help you achieve your goals in a streamlined way.'
                : index === 1 ? 'Getting started is easy! Just reach out through our contact form below.'
                : 'Yes, we provide 24/7 support. Contact us anytime!'}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Section>

      {/* Contact Us Form */}
      <Section>
        <SectionTitle variant="h5">Contact Us</SectionTitle>
        <Grid
      container
      spacing={isSmallScreen ? 0 : 2}
      style={{ maxWidth: '1200px', margin: '0 auto' }}
    >  
    <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Name" sx={{marginTop:{xs:'20px',md:'0px'}}} variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Contact No."sx={{marginTop:{xs:'20px',md:'0px'} }} variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Email"sx={{marginTop:{xs:'20px',md:'0px'} }} variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField fullWidth label="Subject"sx={{marginTop:{xs:'20px',md:'0px'} }} variant="outlined" required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Message"sx={{marginTop:{xs:'20px',md:'0px'}}} variant="outlined" required multiline rows={4} />
          </Grid>
          <Grid item xs={12}>
            <ContactFormButton variant="contained" sx={{px:3,py:1,marginTop:{xs:'20px',md:'0px'}}} >
              Send Message
            </ContactFormButton>
          </Grid>
        </Grid>
      </Section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
