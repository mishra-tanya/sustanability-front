import { jsPDF } from 'jspdf';
import QRCode from "qrcode";
import imageURL from '/cp.png';

interface CertificateData {
  certificateNumber: string;
  username: string;
  userSchool: string;
  classGroup: string;
  date: string;
  baseUrl: string;
}

export const generateCertificatePDFs = async (data: CertificateData) => {
    const { certificateNumber, username, userSchool, classGroup, date, baseUrl } = data;
  try {
    const doc = new jsPDF('landscape');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const qrCodeData = await QRCode.toDataURL(`${baseUrl}/verification/${certificateNumber}`);

    doc.addImage(imageURL, 'JPEG', 0, 0, pageWidth, pageHeight);

    doc.setFont('times', 'italic');
    doc.setFontSize(28);
    doc.text(username, 148, 110, { align: 'center' });

    doc.setFont('times', 'normal');
    doc.setFontSize(16);
    doc.text(
      `of School ${userSchool}, Class group ${classGroup}
         for successfully participating in the Sustainability Olympiad Event organized by the SCR Team.`,
      148,
      124,
      { align: 'center', maxWidth: 250 }
    );
    doc.text('We appreciate your presence and wish you all the best for future endeavors.', 148, 137, {
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
