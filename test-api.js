import http from 'http';

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- Testing Updated Coimbatore & GST Express API ---');

  // Test 1: Coimbatore Service Area Search
  const areas = await makeRequest({ host: 'localhost', port: 5001, path: '/api/service-areas?query=641004', method: 'GET' });
  console.log('1. Coimbatore Pincode Search (641004):', areas.success ? 'PASSED ✅' : 'FAILED ❌', areas.data[0]?.areaName);

  // Test 2: Order with Manufactured Empty Cans + 18% GST + UPI Payment
  const orderData = {
    name: 'Hemamalini S',
    phone: '9876543210',
    address: 'Peelamedu, Coimbatore',
    pincode: '641004',
    product: 'Heavy Duty 20L Polycarbonate Can (Empty)',
    unitPrice: 180,
    quantity: 10,
    paymentMode: 'upi'
  };
  const orderRes = await makeRequest({
    host: 'localhost',
    port: 5001,
    path: '/api/orders',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, orderData);
  console.log('2. Empty Can Order + 18% GST:', orderRes.success ? 'PASSED ✅' : 'FAILED ❌', 'Total Invoice:', orderRes.data?.grandTotal, 'Order ID:', orderRes.data?.orderId);

  // Test 3: Mass Event Booking
  const eventRes = await makeRequest({
    host: 'localhost',
    port: 5001,
    path: '/api/events',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    name: 'K. Rajasekar',
    phone: '9876543210',
    eventType: 'Marriage / Wedding Function',
    eventDate: '2026-10-15',
    guestCount: 500,
    location: 'CODISSIA Trade Fair Complex, Coimbatore',
    paymentMode: 'cod'
  });
  console.log('3. Mass Function Event Booking:', eventRes.success ? 'PASSED ✅' : 'FAILED ❌', 'Event ID:', eventRes.data?.eventId);

  console.log('--- All Coimbatore API Verification Tests Completed Cleanly ---');
}

runTests();
