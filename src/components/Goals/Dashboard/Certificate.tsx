import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';

interface Certificate {
  certificateNumber: string;
  date: string;
  username: string;
  userSchool: string;
}

interface CertificateProps {
  userId: number;
}

const Certificate: React.FC<CertificateProps> = ({ userId }) => {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCertificate = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/certificate/${userId}`, {
          withCredentials: true,  
        });
        setCertificate(response.data);
      } catch (e) {
        console.log(e);
        setError('Failed to fetch certificate');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [userId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!certificate) return <Typography>No certificate found.</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Certificate</Typography>
        <Typography variant="body1">Name: {certificate.username}</Typography>
        <Typography variant="body1">School: {certificate.userSchool}</Typography>
        <Typography variant="body1">Certificate Number: {certificate.certificateNumber}</Typography>
        <Typography variant="body1">Date: {new Date(certificate.date).toLocaleDateString()}</Typography>
        <Button variant="contained" color="primary">Download PDF</Button>
      </CardContent>
    </Card>
  );
};

export default Certificate;
