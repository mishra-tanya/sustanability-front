import React from 'react';
import { Button, Box } from '@mui/material';
import { jsPDF } from 'jspdf'; // Import jsPDF

interface ActionButtonsProps {
  onLeaderboardClick: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onLeaderboardClick ,}) => {
  const generateCertificatePDF = () => {
    const doc = new jsPDF();

    // Add content for the participation certificate (you can customize it)
    doc.setFontSize(22);
    doc.text('Participation Certificate', 20, 30);
    doc.setFontSize(16);
    doc.text('This is to certify that', 20, 50);
    doc.text('has participated in the event.', 20, 60);
    doc.text('Date: ' + new Date().toLocaleDateString(), 20, 70);

    // Customize the content as per your requirements (e.g., name, event details)
    doc.text('Event: SCR Preparation', 20, 80);
    
    // Save the PDF with a filename
    doc.save('participation-certificate.pdf');
  };

  return (
    <>
      {/* {console.log('Action Buttons rendered')} */}
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
          onClick={generateCertificatePDF}  // Handle the PDF download
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
