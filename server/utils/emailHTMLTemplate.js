const passwordResetEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forget Password</title>
</head>
<body style="font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="text-align: center;">OTP For Resetting Password</h2>
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
            <p>Your OTP for Resetting Password is <strong>{{OTP}}</strong>.</p>
            <p>Please ignore if you haven't requested this.</p>
        </div>
    </div>
</body>
</html>
`;

const orderItemsTableStyle = `
    border-collapse: collapse;
    width: 100%;
`;

const tableHeaderCellStyle = `
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    background-color: #f2f2f2;
`;

const tableCellStyle = `
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`;

const preparingTemplate = (order) => {
  const orderItemsTable = `
        <table style="border-collapse: collapse; width: 100%;">
            <thead style="background-color: #f2f2f2;">
                <tr>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Image</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Name</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Price</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Quantity</th>
                </tr>
            </thead>
            <tbody>
                ${order.orderItems
                  .map(
                    (item) => `
                    <tr>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><img src="${item.image}" alt="${item.name}" style="max-width: 100px;"></td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.name}</td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">$${item.price}</td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.quantity}</td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    `;

  return `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; background-color: #f9f9f9;">
        <img src="https://res.cloudinary.com/dbujzuiz0/image/upload/v1711968988/logo_pjd0xm.png" alt="Order Image" style="max-width: 20%; height: auto; margin-top: 10px;">
            <h2 style="color: #333;">Your Order is Being Prepared</h2>
            <p style="color: #666;">Dear Customer,</p>
            <p style="color: #666; ">Your order with ID <strong>${order._id}</strong> is now being prepared and will be shipped soon.</p>
            ${orderItemsTable}
            <p style="color: #666; font-weight: bold;">Overall Price: $${order.totalAmount}</p>
            <p style="color: #666; font-weight: bold;">Shipping Address: ${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.country} - ${order.shippingInfo.pinCode}</p>
            <p style="color: #666;">Thank you for shopping with us.</p>
        </div>
    `;
};

const shippedTemplate = (order) => {
  const orderItemsTable = `
        <table style="border-collapse: collapse; width: 100%;">
            <thead style="background-color: #f2f2f2;">
                <tr>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Image</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Name</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Price</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Quantity</th>
                </tr>
            </thead>
            <tbody>
                ${order.orderItems
                  .map(
                    (item) => `
                    <tr>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><img src="${item.image}" alt="${item.name}" style="max-width: 100px;"></td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.name}</td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">$${item.price}</td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.quantity}</td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    `;

  return `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; background-color: #f9f9f9;">
        <img src="https://res.cloudinary.com/dbujzuiz0/image/upload/v1711968988/logo_pjd0xm.png" alt="Order Image" style="max-width: 20%; height: auto; margin-top: 10px;">
            <h2 style="color: #333;">Your Order is Being Shipped</h2>
            <p style="color: #666;">Dear Customer,</p>
            <p style="color: #666;">Your order with ID <strong>${order._id}</strong> is now being shipped and will be delivered soon.</p>
            ${orderItemsTable}
            <p style="color: #666;">Overall Price: $${order.totalAmount}</p>
            <p style="color: #666;">Shipping Address: ${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.country} - ${order.shippingInfo.pinCode}</p>
            <p style="color: #666;">Thank you for shopping with us.</p>
        </div>
    `;
};

const deliveredTemplate = (order) => {
  const orderItemsTable = `
        <table style="border-collapse: collapse; width: 100%;">
            <thead style="background-color: #f2f2f2;">
                <tr>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Image</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Name</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Price</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Quantity</th>
                </tr>
            </thead>
            <tbody>
                ${order.orderItems
                  .map(
                    (item) => `
                    <tr>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><img src="${item.image}" alt="${item.name}" style="max-width: 100px;"></td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.name}</td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">$${item.price}</td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.quantity}</td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    `;

  return `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; background-color: #f9f9f9;">
        <img src="https://res.cloudinary.com/dbujzuiz0/image/upload/v1711968988/logo_pjd0xm.png" alt="Order Image" style="max-width: 20%; height: auto; margin-top: 10px;">
            <h2 style="color: #333;">Your Order is Delivered</h2>
            <p style="color: #666;">Dear Customer,</p>
            <p style="color: #666;">Your order with ID <strong>${order._id}</strong> has been delivered successfully.</p>
            ${orderItemsTable}
            <p style="color: #666;">Overall Price: $${order.totalAmount}</p>
            <p style="color: #666;">Shipping Address: ${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.country} - ${order.shippingInfo.pinCode}</p>
            <p style="color: #666;">Thank you for shopping with us.</p>
            
        </div>
    `;
};

export {
  passwordResetEmailTemplate,
  preparingTemplate,
  shippedTemplate,
  deliveredTemplate,
};
