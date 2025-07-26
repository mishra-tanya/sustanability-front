import { Typography, Container } from '@mui/material';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Seo from '../../seo/Seo';

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <Seo
        title="Privacy Policy - Sustainability Olympiad"
        description="Learn about the Sustainability Olympiad and how we promote awareness of the 17 UN SDGs among students."
        canonicalUrl="https://sustainabilityolympiad.org/privacy-policy"
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
          Privacy Policy
        </Typography><br />

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, textAlign: 'justify' }}
        >
          At <strong>SustainabilityOlympiad.org</strong>, we are committed to protecting your personal information and your right to privacy. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or participate in the Sustainability Olympiad.
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          1. Information We Collect
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          We may collect personal information such as your name, email address, contact number, grade, and school information when you register or fill out a form on our platform.
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The information you provide is used to:
          <ul style={{ marginTop: 8, marginBottom: 16, paddingLeft: 20 }}>
            <li>Register you for the Olympiad and other events</li>
            <li>Send important updates, performance reports, or certificates</li>
            <li>Improve our services and user experience</li>
            <li>Respond to your queries or support requests</li>
          </ul>
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          3. Sharing Your Data
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          We do not sell, trade, or share your personal information with third parties without your consent, except where required by law.
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          4. Data Security
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          We implement standard security measures to protect your data from unauthorized access, disclosure, or alteration.
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          5. Your Consent
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          By using our website, you consent to our Privacy Policy and the collection and use of your information as outlined.
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          6. Changes to This Policy
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          We may update this policy from time to time. Changes will be posted on this page with an updated effective date.
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          7. Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary">
          If you have any questions about our Privacy Policy, please contact us at{' '}
           <a href="mailto:info@sustainabilityolympiad.org" >info@sustainabilityolympiad.org</a>
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
