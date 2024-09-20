
const config = require('./configs/config')
  
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function findNearestWarehouse(customerLat, customerLong) {
  return config.warehouses.reduce((nearest, warehouse) => {
    const distance = calculateDistance(customerLat, customerLong, warehouse.lat, warehouse.long);
    return distance < nearest.distance ? { warehouse, distance } : nearest;
  }, { warehouse: null, distance: Infinity });
}

function getTransportMode(distance) {
  return config.transportModes.find(mode => distance >= mode.minDistance);
}

function calculateShippingCharge(productName, quantity, customerId, deliveryType) {
  console.log()
  const product = config.products.find(p => p.name === productName);
  const customer = config.customers.find(c => c.id === customerId);
  const delivery = config.deliveryTypes.find(d => d.name === deliveryType);

  if (!product || !customer || !delivery) {
    throw new Error('Invalid input data');
  }

  const { warehouse, distance } = findNearestWarehouse(customer.lat, customer.long);
  const transportMode = getTransportMode(distance);

  const totalWeight = product.weight * quantity;
  const shippingCharge = distance * transportMode.ratePerKmPerKg * totalWeight;
  const expressCharge = delivery.name === 'Express' ? delivery.extraChargePerKg * totalWeight : 0;

  const totalCharge = delivery.baseCharge + shippingCharge + expressCharge;

  return Number(totalCharge.toFixed(2));
}

function handleShippingChargeRequest(req, res) {
  try {
    const { productName, quantity, customerId, deliveryType } = req.query;
    
    if (!productName || !quantity || !customerId || !deliveryType) {
      throw new Error('Missing required parameters');
    }

    const shippingCharge = calculateShippingCharge(productName, parseInt(quantity), customerId, deliveryType);
    res.json({ ShippingCharge: shippingCharge });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

  const express = require('express');
  const app = express();
  app.get('/shipping-charge', handleShippingChargeRequest);
  app.listen(3000, () => console.log('Server running on port 3000'));
  
  module.exports = { calculateShippingCharge, handleShippingChargeRequest };