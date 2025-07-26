import { Typography, Container } from '@mui/material';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Seo from '../../seo/Seo';

const RefundPolicy = () => {
  return (
    <>
      <Navbar />
      <Seo
        title="Refund Policy - Sustainability Olympiad"
        description="Learn about the Sustainability Olympiad and how we promote awareness of the 17 UN SDGs among students."
        canonicalUrl="https://sustainabilityolympiad.org/refund-policy"
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
          Cancellation and Refund Policy
        </Typography>
        <br />

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, textAlign: 'justify' }}
        >
          At <strong>IndiaESG.org</strong>, we strive to provide accessible, meaningful educational experiences for all students through the Sustainability Olympiad and related programs. As most of our offerings are provided free of charge, cancellation and refund policies are limited to optional paid services or donations.
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          1. Optional Payments and Donations
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ textAlign: 'justify' }}>
          Participation in the Sustainability Olympiad is free. Any payments made by users are completely optional and may go toward premium features such as personalized certificates, detailed reports, or educational materials.
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          2. No Refund Policy
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ textAlign: 'justify' }}>
          Since payments are voluntary and primarily support platform development and sustainability outreach, <strong>we do not offer refunds</strong> for any optional contributions or purchases. We request users to consider this before making a payment.
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          3. Cancellation of Optional Services
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ textAlign: 'justify' }}>
          Users may opt out of future optional services or subscriptions by contacting our support team. However, cancellations will not result in refunds for payments already processed.
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          4. Contact for Queries
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
          For any questions regarding this policy, please email us at  <a href="mailto:info@sustainabilityolympiad.org" >info@sustainabilityolympiad.org</a>
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

export default RefundPolicy;
