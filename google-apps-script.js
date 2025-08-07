// Google Apps Script for Contact Form
// Deploy this as a web app to handle form submissions

function doPost(e) {
  try {
    // Set CORS headers to allow cross-origin requests
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };
    
    // Parse the JSON data from the form
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet (you'll need to create this)
    const spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID_HERE');
    const sheet = spreadsheet.getSheetByName('Contact Form Responses');
    
    // Prepare the row data
    const rowData = [
      new Date(), // Timestamp
      data.name,
      data.email,
      data.subject,
      data.message,
      data.newsletter,
      data.timestamp
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Send email notification (optional)
    sendEmailNotification(data);
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Form submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Error processing form submission' }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  }
}

function doOptions(e) {
  // Handle preflight OPTIONS request for CORS
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

function sendEmailNotification(data) {
  // Optional: Send email notification to yourself
  const recipient = 'samarthifyy@gmail.com'; // Replace with your email
  const subject = `New Contact Form Submission: ${data.subject}`;
  const body = `
    New contact form submission received:
    
    Name: ${data.name}
    Email: ${data.email}
    Subject: ${data.subject}
    Message: ${data.message}
    Newsletter Subscription: ${data.newsletter}
    Timestamp: ${data.timestamp}
  `;
  
  try {
    GmailApp.sendEmail(recipient, subject, body);
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput('Contact Form Handler is working!')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
} 