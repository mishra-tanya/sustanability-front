import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Box } from '@mui/material';
import api from '../../../services/axios';
import LoadingSpinner from '../../common/LoadingSpinner';
import { generateCertificatePDFs } from '../common/generateCertificate';

interface Certificate {
  certificateNumber: string;
  date: string;
  certificate_content: string;
  certificate_type: string;
  username: string;
  created_at: string;
  certificate_id: string;
  userSchool: string;
}

interface CertificateProps {
  userId: number;
}

const Certificate: React.FC<CertificateProps> = ({ userId }) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [userName, setUserName] = useState<string>('');


  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    const fetchCertificate = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/getAllCertificates`);
        console.log(response.data.certificate);
        setUserName(response.data.userName);
        setCertificates(response.data.certificate);
      } catch (e) {
        console.error(e);
        setError('Failed to fetch certificates');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [userId]);

  if (loading) return <LoadingSpinner size={33} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!certificates.length) return <Typography>No certificates found.</Typography>;

  const handleGenerateCertificatePDF = async (certificate: Certificate) => {
    try {
      await generateCertificatePDFs({
        certificateNumber: certificate.certificate_id,
        username: userName,
        userSchool: certificate.userSchool,
        classGroup: certificate.certificate_content,
        date: new Date(certificate.created_at).toLocaleDateString(),
        baseUrl,
      });
    } catch (error) {
      console.error('Error generating certificatesc:', error);
      alert('Failed to generate certificate. Please try again.');
    }
  };

  return (
    <Grid container spacing={3}>
      {certificates.map((certificate, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Card   sx={{
      position: 'relative',
      height: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden', 
      backgroundColor: '#fff',   
    }}>
       <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url('/no_bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity:0.07,
        zIndex: 0,   
      }}
    />
            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
    
              <Typography variant="h5" align="center">
                <b>Certificate {index + 1}</b>
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1">
                    <b>Certificate ID:</b> {certificate.certificate_id}
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <b>Class Group:</b> {certificate.certificate_content}
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <b>Type:</b> {certificate.certificate_type}
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <b>Certification Date:</b>{' '}
                    {new Date(certificate.created_at).toLocaleDateString()}
                  </Typography>
                </li>
              </ul>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleGenerateCertificatePDF(certificate)}
                >
                  Download PDF
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Certificate;
