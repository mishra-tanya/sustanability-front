import { Typography, Container } from '@mui/material';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Seo from '../../seo/Seo';

const Pricing = () => {
  return (
   <>
   <Navbar/>
   <Seo
                title="Pricing - Sustainability Olympiad"
                description="Learn about the Sustainability Olympiad and how we promote awareness of the 17 UN SDGs among students."
                canonicalUrl="https://sustainabilityolympiad.org/pricing"
                image="https://www.sustainabilityolympiad.org/im.jpg"
              />
    <Container maxWidth="md" sx={{ py: 10, maxWidth: 900 }}>
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        color="primary"
        gutterBottom
      >
        Pricing Details
      </Typography>
      <br />

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'justify' }}>
        Access to the <strong>Sustainability Olympiad</strong> is completely{' '}
        <span style={{ fontWeight: 600 }}>free of charge</span> for all students from grades 4 to 10.
        This includes participation in assessments, access to learning materials, and feedback.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'justify' }}>
        Our goal is to make sustainability education accessible to every student across India, regardless of their background or financial situation.
        That’s why the core Olympiad experience remains free and inclusive.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 2, textAlign: 'justify' }}>
        <strong>Optional payments</strong> are available for students or supporters who wish to unlock additional premium features and support the initiative. 
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify', mb: 3 }}>
        If you choose to make an optional payment, thank you for supporting our mission! Your contribution helps us improve and expand the Olympiad for more students.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify', fontStyle: 'italic' }}>
        If you prefer not to make a payment, no worries at all — you can still fully participate and enjoy the Sustainability Olympiad at no cost.
      </Typography>
    </Container>
   <Footer/>
   </>
  );
};

export default Pricing;
