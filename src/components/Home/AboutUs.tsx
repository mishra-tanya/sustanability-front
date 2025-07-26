import { Box, Typography, Container } from '@mui/material';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Seo from '../../seo/Seo';

const AboutUs = () => {
    return (
        <>
            <Navbar />
             <Seo
                title="About - Sustainability Olympiad"
                description="Learn about the Sustainability Olympiad and how we promote awareness of the 17 UN SDGs among students."
                canonicalUrl="https://sustainabilityolympiad.org/about"
                image="https://www.sustainabilityolympiad.org/im.jpg"
              />
            <Container maxWidth="md" sx={{ py: 8, maxWidth: 900 }}>
                {/* Main Title */}
                <Typography
                    variant="h3"
                    align="center"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                >
                    About Us
                </Typography>
                <br />

                {/* Vision */}
                <Box sx={{ mb: 6 }}>
                    <Typography
                        variant="h5"
                        color="primary"
                        gutterBottom
                        sx={{ textAlign: 'center' }}
                    >
                        Our Vision
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        To cultivate a generation of environmentally conscious, socially
                        responsible young citizens
                        {' '}
                        equipped with the knowledge and passion to create a sustainable
                        future.
                    </Typography>
                </Box>

                {/* Mission */}
                <Box sx={{ mb: 6 }}>
                    <Typography
                        variant="h5"
                        color="primary"
                        gutterBottom
                        sx={{ textAlign: 'center' }}
                    >
                        Our Mission
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        The Sustainability Olympiad aims to make the UN's 17 Sustainable
                        Development Goals accessible, understandable, and actionable for
                        students across India. By providing engaging assessments and
                        recognition for achievement, we seek to inspire young minds to
                        become sustainability champions in their schools, homes, and
                        communities.
                    </Typography>
                </Box>

                {/* Story */}
                <Box sx={{ mb: 6 }}>
                    <Typography
                        variant="h5"
                        color="primary"
                        gutterBottom
                        sx={{ textAlign: 'center' }}
                    >
                        Our Story
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph sx={{ textAlign: 'justify' }}>
                        The Sustainability Olympiad was born from a simple observation: while
                        sustainability is one of the most critical challenges of our time,
                        it remains insufficiently addressed in standard educational
                        curricula. Launched by <strong>IndiaESG.org</strong> in 2024, the
                        Olympiad bridges this gap by offering a structured, engaging
                        approach to sustainability education that complements classroom
                        learning.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        Our team of educators, sustainability experts, and educational
                        psychologists has designed an assessment framework that not only
                        tests knowledge but nurtures curiosity and inspires action. We
                        believe that understanding precedes change, and our goal is to help
                        students understand sustainability in ways that are meaningful to
                        their daily lives and future aspirations.
                    </Typography>
                </Box>

                {/* What is Olympiad */}
                <Box sx={{ mb: 6 }}>
                    <Typography
                        variant="h5"
                        color="primary"
                        gutterBottom
                        sx={{ textAlign: 'center' }}
                    >
                        What is the Sustainability Olympiad?
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        The Sustainability Olympiad is an innovative{' '}
                        <strong>FREE educational initiative</strong> by{' '}
                        <strong>IndiaESG.org</strong> designed to inspire students from
                        grades 4 to 10 to explore, understand, and engage with global
                        sustainability challenges through fun, interactive assessments
                        aligned with the 17 UN Sustainable Development Goals.
                    </Typography>
                </Box>

                {/* What is indiesg */}
                <Box sx={{ mb: 6 }}>
                    <Typography
                        variant="h5"
                        color="primary"
                        gutterBottom
                        sx={{ textAlign: 'center' }}
                    >
                        About IndiaESG.org
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        IndiaESG.org is a not-for-profit organization
                        dedicated to advancing sustainability awareness and action across India.
                        Through educational initiatives, community engagement, and resource development.

                        We work to make
                        Environmental, Social, and Governance (ESG) principles understood and implemented by organizations, communities, and individuals throughout the country.

                        The Sustainability Olympiad represents our flagship educational initiative, embodying our belief that meaningful change begins with education and awareness among the youngest members of our society.

                    </Typography>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default AboutUs;
