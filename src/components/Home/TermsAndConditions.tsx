import { Typography, Container } from '@mui/material';
import Navbar from '../Navbar';
import Footer from '../Footer';

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 10, maxWidth: 900 }}>
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          Terms and Conditions
        </Typography>
        <br />

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'justify' }}>
          By accessing and using this website, you agree to comply with the following terms and conditions. Please read them carefully before participating in any activity on our platform.
        </Typography>

        <Typography variant="h6" gutterBottom fontWeight="medium" color="primary" sx={{ mt: 4 }}>
          1. Free Access and Optional Payments
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'justify' }}>
          Our platform offers free access to educational materials, assessments, and resources. Some optional features or recognitions may require payment, but they are not mandatory for participation.
        </Typography>

        <Typography variant="h6" gutterBottom fontWeight="medium" color="primary">
          2. Use of Content
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'justify' }}>
          All content provided is intended for educational purposes only. Users may not reproduce or distribute any material from this website without prior written permission.
        </Typography>

        <Typography variant="h6" gutterBottom fontWeight="medium" color="primary">
          3. Privacy and Data
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'justify' }}>
          We are committed to protecting your personal information. Any data collected will be used solely for platform functionality and will not be shared with third parties without consent.
        </Typography>

        <Typography variant="h6" gutterBottom fontWeight="medium" color="primary">
          4. User Conduct
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'justify' }}>
          Users must not engage in any behavior that disrupts the platform, infringes on others' rights, or violates laws. Misuse may lead to access restriction or legal action.
        </Typography>

        <Typography variant="h6" gutterBottom fontWeight="medium" color="primary">
          5. Updates to Terms
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'justify' }}>
          We reserve the right to update or modify these terms at any time. Changes will be posted on this page and take effect immediately upon publication.
        </Typography>

        <Typography variant="h6" gutterBottom fontWeight="medium" color="primary">
          6. Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
          If you have any questions or concerns about these terms, please contact us at <a href="mailto:info@sustainabilityolympiad.org" >info@sustainabilityolympiad.org</a>
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
