import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import imageURL from '/cp.jpg';
import api from '../../../services/axios';
import { quotes } from './quotes/Quotes';

interface CertificateData {
  certificateNumber: string;
  username: string;
  userSchool: string;
  classGroup: string;
  date: string;
  baseUrl: string;
  userId: number;
}

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; 
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const generateCertificatePDFs = async (data: CertificateData) => {
  const { certificateNumber, username, userSchool, classGroup, date, baseUrl, userId } = data;
  const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
  try {
    const qrCodeData = await QRCode.toDataURL(`${baseUrl}/verification/${certificateNumber}`);

    const doc = new jsPDF('landscape');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.addImage(imageURL, 'JPEG', 0, 0, pageWidth, pageHeight);

    doc.setFont('times', 'italic');
    doc.setFontSize(28);
    doc.text(username, pageWidth / 2, 110, { align: 'center' });

    doc.setFont('times', 'normal');
    doc.setFontSize(16);
    doc.text(
      `from ${userSchool}, Class group ${classGroup} for successfully participating in the Sustainability Olympiad Event 
      organized by the SustainabilityOlympiad.org.`,
      pageWidth / 2,
      124,
      { align: 'center', maxWidth: 250 }
    );
    doc.text('We appreciate your presence and wish you all the best for future endeavors.', pageWidth / 2, 137, {
      align: 'center',
      maxWidth: 250,
    });

    doc.setFont('times', 'italic');
doc.setFontSize(12);
doc.text(`"${selectedQuote}"`, pageWidth / 2, 150, {
  align: 'center',
  maxWidth: 280,
});

    doc.setFont('times', 'italic');
    doc.setFontSize(12);
    doc.addImage(qrCodeData, 'PNG', 20, 170, 25, 25);

    doc.text(`Date of Certification: ${date}`, 20, 200);
    doc.text(`Certificate Number: ${certificateNumber}`, pageWidth - 20, 200, { align: 'right' });

    const canvas = document.createElement('canvas');
    canvas.width = 842; 
    canvas.height = 595; 
    const ctx = canvas.getContext('2d')!;
    
    const bgImg = await loadImage(imageURL);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    const setFont = (italic: boolean, size: number) => {
      ctx.font = `${italic ? 'italic' : 'normal'} ${size}px Times New Roman`;
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
    };

    const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const words = text.split(' ');
      let line = '';
      const lines: string[] = [];

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        if (ctx.measureText(testLine).width > maxWidth && n > 0) {
          lines.push(line.trim());
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line.trim());

      lines.forEach((lineText, i) => {
        ctx.fillText(lineText, x, y + i * lineHeight);
      });
    };

    setFont(true, 30);
    ctx.fillText(username, canvas.width/2 , 310);

    setFont(false, 16);
    wrapText(
      `of School ${userSchool}, Class group ${classGroup} for successfully participating in the Sustainability Olympiad Event organized by the SCR Team. We appreciate your presence and wish you all the best for future endeavors.`,
      canvas.width/2 ,
      350,
      600,
      20
    );

    const qrImg = await loadImage(qrCodeData);
    ctx.drawImage(qrImg, 50, 460, 80, 80);

  // Text below the QR Code
  setFont(true, 12);
    ctx.textAlign = 'left';
    setFont(true, 12);
    ctx.fillText(`Date of Certification: ${date}`, 124, 550);

    ctx.textAlign = 'right';
    ctx.fillText(`Certificate Number: ${certificateNumber}`, canvas.width - 40, 550);



    const previewBlob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/png');
    });

    const pdfBlob = doc.output('blob');

    const formData = new FormData();
    formData.append('certificate', pdfBlob, `certificate_${certificateNumber}.pdf`);
    formData.append('preview_image', previewBlob, `certificate_${certificateNumber}.png`);
    formData.append('certificateNumber', certificateNumber);
    formData.append('username', username);

    const response = await api.post('/upload-certificate', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.status !== 200) throw new Error('Upload failed');

    const certificateUrl = response.data.certificateUrl;
    const previewUrl = response.data.previewUrl;

    // Redirect to view page
    window.location.href = `/certificate-view?url=${encodeURIComponent(
      certificateUrl
    )}&username=${encodeURIComponent(username)}&userId=${userId}&preview=${encodeURIComponent(previewUrl)}`;

    alert('Certificate generated successfully!');
  } catch (error) {
    console.error('Error generating or uploading certificate:', error);
    alert('Failed to generate/upload certificate. Please try again.');
  }
};
