import React from 'react';
import { Button, Box } from '@mui/material';
import { jsPDF } from 'jspdf'; 
import api from '../../../services/axios';
import imageURL from '/cp.png';
import QRCode from "qrcode";

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
          type: "participation",
          classGr:classGroupProp
        },
        { withCredentials: true }
      );
      console.log(response.data);
      const { certificateNumber, date, username ,userSchool,classGroup} = response.data;
      const doc = new jsPDF('landscape');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
     
      const qrCodeData = await QRCode.toDataURL(`${baseUrl}/verification/${certificateNumber}`);

      // const qrCodeData = await QRCode.toDataURL(`http://localhost:5173/verification/${certificateNumber}`);

      doc.addImage(imageURL, 'JPEG', 0, 0, pageWidth, pageHeight);

      doc.setFont('times', 'italic');
      doc.setFontSize(28);
      doc.text(username, 148, 110, { align: 'center' });

      doc.setFont('times', 'normal');
      doc.setFontSize(16);
      doc.text(
        `of School ${userSchool}, Class group ${classGroup}
         for successfully participating in the Sustainabiliy  Olympiad Event organized by the SCR Team.`,
        148,
        124,
        { align: 'center', maxWidth: 250 }
      );
      doc.text('We appreciate your presence and wish you all the best for future endeavours.', 148, 137, {
        align: 'center',
        maxWidth: 250,
      });
      doc.setFont('times', 'italic');
      doc.setFontSize(12);
      doc.addImage(qrCodeData, "PNG", 20, 160, 25, 25);
      const leftX = 20;

      doc.text(`Date of Certification: ${date}`, leftX, 195);

      const rightX = 190;
      doc.text(`Certificate Number: ${certificateNumber}`, rightX, 195);

      doc.save('participation-certificate.pdf');
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
