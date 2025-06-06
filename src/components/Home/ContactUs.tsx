import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    Grid,
} from '@mui/material';
import api from '../../services/axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact_no: '',
        email: '',
        subject: '',
        message: '',
    });

    const [success, setSuccess] = useState('');
    const [failure, setFailure] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('contact', formData);
            setSuccess(response.data.message);
            setFailure('');
            setFormData({
                name: '',
                contact_no: '',
                email: '',
                subject: '',
                message: '',
            });
        } catch (error) {
            setSuccess('');
            setFailure('There was an error sending your message. Please try again.');
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            <Box maxWidth="lg" mx="auto" px={2} py={5}>
                <Typography
                    variant="h3"
                    align="center"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                >
                    Contact Us
                </Typography>
                <br />


                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                {failure && <Alert severity="error" sx={{ mb: 2 }}>{failure}</Alert>}

                <Grid container spacing={6}>
                    {/* Contact Info & Map Side */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ bgcolor: '#dbf0ff', p: 4, borderRadius: 2, height: '100%' }}>
                            <Typography variant="h6" gutterBottom color="primary">
                                Contact Information
                            </Typography>
                            <br />
                            <Typography variant="body1" gutterBottom>
                                <strong>Call us:</strong> +91-9137835145
                            </Typography><br />
                            <Typography variant="body1" gutterBottom>
                                <strong>Email us:</strong><a href="mailto:info@sustainabilityolympiad.org" >info@sustainabilityolympiad.org</a>
                            </Typography><br />
                            <Typography variant="body1" gutterBottom>
                                <strong>Email us:</strong> <a href="mailto:info@indiaesg.org" >info@indiaesg.org</a>
                            </Typography><br />
                            <Typography variant="body1" gutterBottom>
                                <strong>Address: </strong>
                                HD-093, WeWork 247 Park, 13th Floor,<br />
                                Vikhroli Corporate Park, Hindustan C. Bus Stop,<br />
                                Lal Bahadur Shastri Rd, Gandhi Nagar,<br />
                                Vikhroli West, Mumbai, MH 400079
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Form Side */}
                    <Grid item xs={12} md={7}>
                            <form onSubmit={handleSubmit} noValidate>
                                <Grid container spacing={2}>
                                    {/* Name and Email in one row */}
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Name"
                                            name="name"
                                            fullWidth
                                            required
                                            margin="normal"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Email"
                                            name="email"
                                            type="email"
                                            fullWidth
                                            required
                                            margin="normal"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    {/* Contact Number and Subject in one row */}
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Contact Number"
                                            name="contact_no"
                                            fullWidth
                                            required
                                            margin="normal"
                                            value={formData.contact_no}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Subject"
                                            name="subject"
                                            fullWidth
                                            required
                                            margin="normal"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Message as full width in its own row */}
                                <TextField
                                    label="Message"
                                    name="message"
                                    fullWidth
                                    required
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    sx={{ mt: 3 }}
                                    fullWidth
                                >
                                    Send Message
                                </Button>
                            </form>

                    </Grid>


                </Grid>
            </Box>
            <Footer />
        </>
    );
};

export default ContactUs;
