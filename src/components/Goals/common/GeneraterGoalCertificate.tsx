import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import imageURL from '/goal_bg.jpg';
import { images } from './GoalImages';
import { sdgAchievements } from './quotes/GoalStmt';
import { quotes } from './quotes/Quotes';
import api from '../../../services/axios';  

interface GoalCertificateData {
  certificateNumber: string;
  username: string;
  userSchool: string;
  classId: number;
  date: string;
  baseUrl: string;
  goalId: number;
  userId:number;
}

export const generateGoalCertificatePDF = async (data: GoalCertificateData) => {
  const { certificateNumber, username, userSchool, classId, date, baseUrl, goalId,userId } = data;
  const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];

  try {
    const doc = new jsPDF('landscape');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const imageIndex = (goalId - 1) % images.length;
    const goalImage = images[imageIndex];

    const qrCodeData = await QRCode.toDataURL(`${baseUrl}/verification/${certificateNumber}`);
    const goalImageData = await loadImageAsDataURL(goalImage);
    const achievementStatement = sdgAchievements[imageIndex];
    const sdglines = achievementStatement.lines;
    const sdgtitle = achievementStatement.title;

    // Background
    const backgroundData = await loadImageAsDataURL(imageURL);
    doc.addImage(backgroundData, 'JPEG', 0, 0, pageWidth, pageHeight);

    // SDG goal icon
    doc.addImage(goalImageData, 'JPEG', 98, 165, 33, 30);

    // Text content
    doc.setFont('times', 'italic');
    doc.setFontSize(28);
    doc.text(username, 148, 110, { align: 'center' });

    doc.setFont('times', 'normal');
    doc.setFontSize(16);
    doc.text(
      `from ${userSchool}, Class group ${classId} has successfully completed the Sustainability Olympiad assessment series
       for ${sdgtitle} 
       demonstrating exceptional understanding of global sustainability challenges and solutions`,
      145,
      124,
      { align: 'center' }
    );

    const maxTextWidth = 250;
    const wrappedText = doc.splitTextToSize(username + " " + sdglines, maxTextWidth);
    doc.text(wrappedText, 148, 145, { align: 'center' });

    // QR Code bottom-left
    doc.setFont('times', 'italic');
    doc.setFontSize(12);
    doc.addImage(qrCodeData, "PNG", 20, 20, 25, 25);

    doc.text(`"${selectedQuote}"`, pageWidth / 2, 160, { align: 'center', maxWidth: 280 });

    // Footer info
    doc.text(`Date of Certification: ${date}`, 20, 13);
    doc.text(`Certificate Number: ${certificateNumber}`, 200, 199);

    // ---- New: create image preview from the PDF content ----
    // Create a hidden canvas with same PDF page size (A4 landscape ~ 842x595)
    const canvas = document.createElement('canvas');
    canvas.width = 842;
    canvas.height = 595;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context unavailable');

    // Load background for canvas
    const bgImg = await loadImageAsHTMLImage(imageURL);
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // Load goal image icon on canvas
    const goalImg = await loadImageAsHTMLImage(goalImage);
    ctx.drawImage(goalImg, 99 * (canvas.width / pageWidth), 165 * (canvas.height / pageHeight), 33 * (canvas.width / pageWidth), 30 * (canvas.height / pageHeight));

    // Draw text on canvas - You can use similar font styles
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = 'italic 28px Times New Roman';
    ctx.fillText(username, canvas.width / 2, 110 * (canvas.height / pageHeight));

    ctx.font = 'normal 16px Times New Roman';
    // Wrap text manually on canvas for sdglines + other text
    wrapTextOnCanvas(ctx,
      `from ${userSchool}, Class group ${classId} has successfully completed the Sustainability Olympiad assessment series for ${sdgtitle} demonstrating exceptional understanding of global sustainability challenges and solutions`,
      canvas.width / 2,
      124 * (canvas.height / pageHeight),
      600,
      20);

    wrapTextOnCanvas(ctx, username + " " + sdglines, canvas.width / 2, 145 * (canvas.height / pageHeight), 600, 20);

    // Draw QR code on canvas
    const qrImg = await loadImageAsHTMLImage(qrCodeData);
    ctx.drawImage(qrImg, 20 * (canvas.width / pageWidth), 20 * (canvas.height / pageHeight), 25 * (canvas.width / pageWidth), 25 * (canvas.height / pageHeight));

    // // Draw quote text
    // ctx.font = 'italic 12px Times New Roman';
    // ctx.fillText(`"${selectedQuote}"`, canvas.width / 2, 160 * (canvas.height / pageHeight));

    // Footer text
    ctx.font = 'normal 12px Times New Roman';

    ctx.textAlign = 'left';
    ctx.fillText(`Date of Certification: ${date}`, 20 * (canvas.width / pageWidth), 13 * (canvas.height / pageHeight));

  ctx.textAlign = 'right';
ctx.fillText(`Certificate Number: ${certificateNumber}`, canvas.width - 47, 199 * (canvas.height / pageHeight));

    // Convert canvas to blob for preview image
    const previewBlob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(blob => resolve(blob!), 'image/png');
    });

    // Convert jsPDF to blob for pdf upload
    const pdfBlob = doc.output('blob');

    // Prepare form data for upload
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

    // Redirect to view page with same query params style
    window.location.href = `/certificate-view?url=${encodeURIComponent(certificateUrl)}&username=${encodeURIComponent(username)}&userId=${userId}&goalId=${goalId}&preview=${encodeURIComponent(previewUrl)}`;

  } catch (error) {
    console.error('Error generating goal certificate:', error);
    alert('Failed to generate goal certificate. Please try again.');
  }
};

// Helper to load an image as HTMLImageElement
async function loadImageAsHTMLImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

// Wrap text for canvas rendering
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


async function loadImageAsDataURL(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
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
