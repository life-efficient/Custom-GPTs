import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { NextApiRequest, NextApiResponse } from 'next';

const getBookingDetails = () => {
  return {
    date: '7 May 2024',
    flightDate: '10th May 2024',
    duration: '02 Hours',
    sector: 'Mumbai - Bhavnagar - Mumbai same day return',
    guests: 3,
    departureTime: '07:45 Hours',
    returnDepartureTime: '15:30 Hours',
    aircraft: 'Learjet 40/Learjet 45',
    quote: 'INR 13.86L + 18% GST',
    notam: '08:00-10:00 Hours, 17:00 - 19:30 Hours',
    watchHours: 'Monday to Friday, 08:35-10:00 Hours, 16:55-18:25 Hours',
    cabinCrew: true,
    relationshipManager: true,
    watchHourExtensionCharges: 'Additional and on actuals',
    insurance: true,
    handling: true,
    depositInfo: 'INR 50,000 additional as a deposit for watch hour extension charges at Bhavnagar Airport for the afternoon departure. Actual bill will be presented after the flight. Refund or additional payment based on the actual bill.'
  };
};

const generatePDF = async (bookingDetails) => {
  const {
    date,
    flightDate,
    duration,
    sector,
    guests,
    departureTime,
    returnDepartureTime,
    aircraft,
    quote,
    notam,
    watchHours,
    cabinCrew,
    relationshipManager,
    watchHourExtensionCharges,
    insurance,
    handling,
    depositInfo,
  } = bookingDetails;

  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();

  // Add a blank page to the document
  const page = pdfDoc.addPage([600, 800]);

  // Define some content
  const title = 'Jetsail Quotation';
  const company = 'JetSail Charters';
  const contactDetails = `JetSail Charters\nModi House, 1st Floor, Off Link Rd, near Fun Republic, Andheri West, Mumbai, Maharashtra 400053\n+919356666633\nwww.jetsail.in\nwww.jetsail.us`;

  // Set up fonts
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Draw the title
  page.drawText(title, {
    x: 50,
    y: 750,
    size: 24,
    font: boldFont,
    color: rgb(0, 0.53, 0.71),
  });

  // Draw the booking details
  const text = `
Date: ${date}
Date of Flight: ${flightDate}
Total Flight Duration: ${duration}
Sector: ${sector}
No of Guests: ${guests} Pax only
Departure Time from ${sector.split(' - ')[0]}: ${departureTime}
Departure Time from ${sector.split(' - ')[1]}: ${returnDepartureTime}
Aircraft: ${aircraft}
Quote: ${quote}

NOTAM at ${sector.split(' - ')[0]}: ${notam}

Watch Hours at ${sector.split(' - ')[1]}: ${watchHours}

NOTE:
Cabin Crew on board: ${cabinCrew ? 'Yes' : 'No'}
Dedicated Relationship Manager F&B for guests on board: ${relationshipManager ? 'Yes' : 'No'}
Watch Hour Extension Charges: ${watchHourExtensionCharges}
Insurance and Air Worthiness Certificate verified: ${insurance ? 'Yes' : 'No'}
Handling at both airports and Crew BLT are already part of the quote shared: ${handling ? 'Yes' : 'No'}
Deposit Information: ${depositInfo}
  `;

  page.drawText(text, {
    x: 50,
    y: 680,
    size: 12,
    font,
    color: rgb(0, 0, 0),
    lineHeight: 18,
  });

  // Draw contact details
  page.drawText(contactDetails, {
    x: 50,
    y: 50,
    size: 10,
    font,
    color: rgb(0, 0, 0),
    lineHeight: 14,
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
};

export { getBookingDetails, generatePDF };

// export default async (req, NextApiRequest, res, NextApiResponse) => {
//   if (req.method === 'GET') {
//     try {
//       const bookingDetails = getBookingDetails();
//       const pdfBytes = await generatePDF(bookingDetails);
//       res.setHeader('Content-Type', 'application/pdf');
//       res.setHeader('Content-Disposition', 'attachment; filename=quotation.pdf');
//       res.send(Buffer.from(pdfBytes));
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to generate PDF' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// };
