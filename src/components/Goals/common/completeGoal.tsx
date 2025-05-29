import { jsPDF } from 'jspdf';
import QRCode from "qrcode";
import imageURL from '/complete_bg.jpg'; // Ensure path is correct and accessible
import api from '../../../services/axios';
import { quotes } from './quotes/Quotes';

interface CertificateData {
  certificateNumber: string;
  username: string;
  userSchool: string;
  classGroup: number;
  date: string;
  baseUrl: string;
  userId: number;
}

export const CompleteGoals = async (data: CertificateData) => {
  const { certificateNumber, username, userSchool, classGroup, date, baseUrl, userId } = data;
  const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
 
  try {
    const doc = new jsPDF('landscape');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const qrCodeData = await QRCode.toDataURL(`${baseUrl}/verification/${certificateNumber}`);
    const backgroundData = await loadImageAsDataURL(imageURL);

    // Background
    doc.addImage(backgroundData, 'JPEG', 0, 0, pageWidth, pageHeight);

    // Name and message (PDF)
    doc.setFont('times', 'italic');
    doc.setFontSize(28);
    doc.text(username, 148, 110, { align: 'center' });

    doc.setFont('times', 'normal');
    doc.setFontSize(16);
    doc.text(
      `of School ${userSchool}, Class group ${classGroup} 
has successfully completed the Sustainability Olympiad assessment series 
demonstrating exceptional understanding of global sustainability challenges and solutions.`,
      148,
      124,
      { align: 'center', maxWidth: 250 }
    );

    doc.setFont('times', 'italic');
    doc.setFontSize(12);
    doc.text(`"${selectedQuote}"`, pageWidth / 2, 150, {
      align: 'center',
      maxWidth: 280,
    });

    // QR Code and footer text
    doc.addImage(qrCodeData, "PNG", 20, 160, 25, 25);
    doc.setFontSize(12);
    doc.text(`Date of Certification: ${date}`, 20, 187);
    doc.text(`Certificate Number: ${certificateNumber}`, 200, 187);

    // Canvas for preview (image version)
    const canvas = document.createElement('canvas');
    canvas.width = 842;
    canvas.height = 595;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context unavailable');

    // Draw background image
    const bgImg = await loadImageAsHTMLImage(imageURL);
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // Draw username
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = 'italic 28px Times New Roman';
    ctx.fillText(username, canvas.width / 2, 110 * (canvas.height / pageHeight));

    // Draw message (wrap text)
    ctx.font = 'normal 16px Times New Roman';
    wrapTextOnCanvas(
      ctx,
      `of  ${userSchool}, Class group ${classGroup} 
has successfully completed the Sustainability Olympiad assessment series 
demonstrating exceptional understanding of global sustainability challenges and solutions.`,
      canvas.width / 2,
      124 * (canvas.height / pageHeight),
      600,
      20
    );

    // Draw the quote (italic smaller font)
    ctx.font = 'italic 12px Times New Roman';
    wrapTextOnCanvas(
      ctx,
      `"${selectedQuote}"`,
      canvas.width / 2,
      150 * (canvas.height / pageHeight),
      600,
      18
    );

    // Draw QR code
    const qrImg = await loadImageAsHTMLImage(qrCodeData);
    ctx.drawImage(qrImg, 20 * (canvas.width / pageWidth), 160 * (canvas.height / pageHeight), 25 * (canvas.width / pageWidth), 25 * (canvas.height / pageHeight));

    // Footer text near QR code
    ctx.textAlign = 'left';
    ctx.font = 'italic 12px Times New Roman';
    ctx.fillText(`Date of Certification: ${date}`, 20 * (canvas.width / pageWidth), 187 * (canvas.height / pageHeight));

    ctx.textAlign = 'right';
    ctx.fillText(`Certificate Number: ${certificateNumber}`, canvas.width - 40, 187 * (canvas.height / pageHeight));

    // Convert canvas to blob
    const previewBlob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(blob => resolve(blob!), 'image/png');
    });

    // PDF blob
    const pdfBlob = doc.output('blob');

    // Upload FormData
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

    // Redirect to view
    window.location.href = `/certificate-view?url=${encodeURIComponent(certificateUrl)}&username=${encodeURIComponent(username)}&userId=${userId}&preview=${encodeURIComponent(previewUrl)}`;
  } catch (error) {
    console.error('Error generating complete certificate:', error);
    alert('Failed to generate certificate. Please try again.');
  }
};

// Utility: Load image as Data URL
async function loadImageAsDataURL(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Canvas context error');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/jpeg');
      resolve(dataURL);
    };
    img.onerror = reject;
  });
}

// Utility: Load image as HTMLImageElement
async function loadImageAsHTMLImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

// Utility: Wrap text for canvas
function wrapTextOnCanvas(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ');
  let line = '';
  let lineCount = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y + lineCount * lineHeight);
      line = words[n] + ' ';
      lineCount++;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y + lineCount * lineHeight);
}
