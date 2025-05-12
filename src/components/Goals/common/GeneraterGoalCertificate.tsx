import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import imageURL from '/goal_bg.jpg';
import { images } from './GoalImages';

interface GoalCertificateData {
  certificateNumber: string;
  username: string;
  userSchool: string;
  classId: number;
  date: string;
  baseUrl: string;
  goalId: number;
}
export const generateGoalCertificatePDF = async (data: GoalCertificateData) => {
  const { certificateNumber, username, userSchool, classId, date, baseUrl, goalId } = data;
  try {
    const doc = new jsPDF('landscape');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const imageIndex = (goalId - 1) % images.length;
    const goalImage = images[imageIndex];

    const qrCodeData = await QRCode.toDataURL(`${baseUrl}/verification/${certificateNumber}`);
    const goalImageData = await loadImageAsDataURL(goalImage);

    // Optional: add background image if needed
    const backgroundImageUrl = imageURL;
    const backgroundData = await loadImageAsDataURL(backgroundImageUrl);
    doc.addImage(backgroundData, 'JPEG', 0, 0, pageWidth, pageHeight);

    // Add SDG goal icon (smaller) on the left
    doc.addImage(goalImageData, 'JPEG', 87, 156, 41, 36); // x=20, y=20, width=25, height=25

    // Certificate text content
    doc.setFont('times', 'italic');
    doc.setFontSize(28);
    doc.text(username, 148, 110, { align: 'center' });

    doc.setFont('times', 'normal');
    doc.setFontSize(16);
    doc.text(
      `of School ${userSchool}, Class group ${classId}`,
      148,
      124,
      { align: 'center' }
    );
    doc.text(
      `for successfully completing Goal ${goalId} as part of the Sustainability Olympiad.`,
      148,
      133,
      { align: 'center' }
    );
    doc.text(
      'We appreciate your efforts and contribution to sustainable learning.',
      148,
      143,
      { align: 'center' }
    );

    // QR Code bottom-left
    doc.setFont('times', 'italic');
    doc.setFontSize(12);
    doc.addImage(qrCodeData, "PNG", 20, 20, 25, 25); // QR bottom-left

    // Footer info
    const leftX = 20;
    doc.text(`Date of Certification: ${date}`, leftX, 13);

    const rightX = 200;
    doc.text(`Certificate Number: ${certificateNumber}`, rightX, 198);

    doc.save(`goal-${goalId}-certificate.pdf`);
  } catch (error) {
    console.error('Error generating goal certificate:', error);
    alert('Failed to generate goal certificate. Please try again.');
  }
};

async function loadImageAsDataURL(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // important if hosted locally or from another domain
    img.src = imageUrl;
    img.onload = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Canvas context error');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/jpeg');
      resolve(dataURL);
    };
    img.onerror = (err) => reject(err);
  });
}
