export const getOrderConfirmationEmail = (orderId: string, total: number, items: any[], customerName: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Order Confirmation - VaultWares</title>
</head>
<body style="font-family: 'Courier New', Courier, monospace; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; color: #000000; line-height: 1.6;">
  
  <div style="border-bottom: 2px solid #000000; padding-bottom: 20px; margin-bottom: 30px;">
    <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">VAULTWARES</h1>
    <p style="margin: 5px 0 0 0; font-size: 12px; color: #666666;">SECURE HARDWARE & INFRASTRUCTURE</p>
  </div>

  <h2 style="font-size: 18px; margin-bottom: 20px;">ORDER CONFIRMATION</h2>
  
  <p>Hello ${customerName},</p>
  <p>Your payment has been successfully processed. Your order is now in our secure fulfillment queue.</p>

  <div style="background-color: #f5f5f5; padding: 20px; margin: 30px 0; border: 1px solid #e0e0e0;">
    <p style="margin: 0 0 10px 0;"><strong>ORDER ID:</strong> ${orderId}</p>
    <p style="margin: 0;"><strong>STATUS:</strong> PAYMENT RECEIVED</p>
  </div>

  <h3 style="font-size: 14px; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">ORDER DETAILS</h3>
  
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 14px;">
    <thead>
      <tr style="border-bottom: 1px solid #000000; text-align: left;">
        <th style="padding: 10px 0;">ITEM</th>
        <th style="padding: 10px 0; text-align: center;">QTY</th>
        <th style="padding: 10px 0; text-align: right;">PRICE</th>
      </tr>
    </thead>
    <tbody>
      ${items.map(item => `
        <tr style="border-bottom: 1px solid #e0e0e0;">
          <td style="padding: 15px 0;">${item.product.name}</td>
          <td style="padding: 15px 0; text-align: center;">${item.quantity}</td>
          <td style="padding: 15px 0; text-align: right;">$${(item.product.price * item.quantity).toFixed(2)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div style="text-align: right; margin-bottom: 40px;">
    <h3 style="margin: 0; font-size: 18px;">TOTAL: $${total.toFixed(2)}</h3>
  </div>

  <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; font-size: 12px; color: #666666;">
    <p>This is an automated message. You will receive another notification containing your tracking number once your package has been handed over to the carrier.</p>
    <p>For support inquiries, please reply directly to this email.</p>
  </div>

</body>
</html>
`;

export const getShippingConfirmationEmail = (orderId: string, trackingNumber: string, carrier: string, customerName: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Order Shipped - VaultWares</title>
</head>
<body style="font-family: 'Courier New', Courier, monospace; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; color: #000000; line-height: 1.6;">
  
  <div style="border-bottom: 2px solid #000000; padding-bottom: 20px; margin-bottom: 30px;">
    <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">VAULTWARES</h1>
    <p style="margin: 5px 0 0 0; font-size: 12px; color: #666666;">SECURE HARDWARE & INFRASTRUCTURE</p>
  </div>

  <h2 style="font-size: 18px; margin-bottom: 20px;">ORDER DISPATCHED</h2>
  
  <p>Hello ${customerName},</p>
  <p>Your order <strong>${orderId}</strong> has been securely packed and handed over to the carrier.</p>

  <div style="background-color: #f5f5f5; padding: 20px; margin: 30px 0; border-left: 4px solid #000000;">
    <p style="margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase;"><strong>Carrier Information</strong></p>
    <p style="margin: 0 0 10px 0;"><strong>CARRIER:</strong> ${carrier}</p>
    <p style="margin: 0;"><strong>TRACKING NUMBER:</strong> ${trackingNumber}</p>
  </div>

  <p style="font-size: 14px;">Please allow up to 24 hours for the tracking information to propagate across the carrier's network.</p>

  <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 40px; font-size: 12px; color: #666666;">
    <p>This is an automated dispatch notification.</p>
  </div>

</body>
</html>
`;
