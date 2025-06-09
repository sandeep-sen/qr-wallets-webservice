const QRCode = require('qrcode');

export async function generateQRCode(data: any): Promise<string> {
  try {
    // Convert the JSON object to a string
    const jsonString = JSON.stringify(data);

    // Generate QR code as SVG
    const qrCodeSVG = await QRCode.toString(jsonString, {
      type: 'svg',
      version: 20,
      errorCorrectionLevel: 'Q',
      width: 256,
      margin: 2
    });

    return qrCodeSVG;
  } catch (error) {
    console.error('Error generating QR code SVG:', error);
    throw new Error('Failed to generate QR code SVG');
  }
}