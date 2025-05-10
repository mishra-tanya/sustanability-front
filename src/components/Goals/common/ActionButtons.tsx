import React from 'react';
import { Button, Box } from '@mui/material';
import api from '../../../services/axios';
import { generateCertificatePDFs } from './generateParticipationCertificate';
interface ActionButtonsProps {
  onLeaderboardClick: () => void;
  classGroupProp:string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onLeaderboardClick, classGroupProp}) => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  // console.log("s2n"+baseUrl)
  const generateCertificatePDF = async () => {
    try {
      const response = await api.post(
        '/generate-certificate',
        {
          type: "Participation",
          classGr:classGroupProp
        },
        { withCredentials: true }
      );
      // console.log(response.data);
      const { certificateNumber, date, username, userSchool, classGroup } = response.data;

      await generateCertificatePDFs({
        certificateNumber,
        username,
        userSchool,
        classGroup,
        date,
        baseUrl,
      });
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Failed to generate certificate. Please try again.');
    }
  };


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-center',
          justifyContent: 'center',
          width: '100%',
          marginTop: '10px',
          marginBottom: '10px',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onLeaderboardClick}
          sx={{
            margin: 2,
          }}
        >
          See Leadership Board
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            margin: 2,
          }}
        >
          Get Merit Certificate
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={generateCertificatePDF}
          sx={{
            margin: 2,
          }}
        >
          Get Participation Certificate
        </Button>
      </Box>
    </>
  );
};

export default ActionButtons;
