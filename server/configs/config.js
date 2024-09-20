const config = {
    transportModes: [
      { name: 'Aeroplane', minDistance: 500, ratePerKmPerKg: 1 },
      { name: 'Truck', minDistance: 100, ratePerKmPerKg: 2 },
      { name: 'Mini Van', minDistance: 0, ratePerKmPerKg: 3 }
    ],
    products: [
      { name: 'Noodles', weight: 0.5, dimension: { l: 10, w: 10, h: 10 } },
      { name: 'Rice Bag', weight: 10, dimension: { l: 1000, w: 800, h: 500 } },
      { name: 'Sugar Bag', weight: 25, dimension: { l: 1000, w: 900, h: 600 } }
    ],
    deliveryTypes: [
      { name: 'Standard', baseCharge: 10, extraCharge: 0 },
      { name: 'Express', baseCharge: 10, extraChargePerKg: 1.2 }
    ],
    warehouses: [
      { name: 'BLR_Warehouse', lat: 12.99999, long: 37.923273 },
      { name: 'MUMB_Warehouse', lat: 11.99999, long: 27.923273 }
    ],
    customers: [
      { id: 'Cust-123', name: 'Shree Kirana Store', lat: 11.232, long: 23.445495 },
      { id: 'Cust-124', name: 'Andheri Mini Mart', lat: 17.232, long: 33.445495 }
    ]
  };

  module.exports = {config}