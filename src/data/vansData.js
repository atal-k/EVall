// FILE: src/data/vansData.js

export const vansData = [
    {
      id: 1,
      name: "Mobility IeV3",
      category: "light-duty",
      tagline: "4.0 D5 PowerPulse Momentum 5dr AW...",
      image: "3wheel-HL.webp",
      status: "available",
      badge: "Available",
      badgeColor: "green",
      specs: {
        range: 500,
        rangeUnit: "km",
        power: 400,
        powerUnit: "kW",
        batteryCapacity: 75,
        batteryUnit: "kWh"
      },
      price: 224000,
      currency: "₹",
      isFeatured: false,
      isWishlisted: false
    },
    {
      id: 2,
      name: "Jupiter Tez",
      category: "light-duty",
      tagline: "4.0 D5 PowerPulse Momentum 5dr AW...",
      image: "3wheel-HL-SV.webp",
      status: "pre-order",
      badge: "Pre-Order",
      badgeColor: "red",
      specs: {
        range: 500,
        rangeUnit: "km",
        power: 400,
        powerUnit: "kW",
        batteryCapacity: 75,
        batteryUnit: "kWh"
      },
      price: 159000,
      currency: "₹",
      isFeatured: false,
      isWishlisted: false
    },
    {
      id: 3,
      name: "EVall e-ZEO V1",
      category: "light-duty",
      tagline: "4.0 D5 PowerPulse Momentum 5dr AW...",
      image: "4wheel-LR.webp",
      status: "available",
      badge: "Available",
      badgeColor: "green",
      specs: {
        range: 500,
        rangeUnit: "km",
        power: 400,
        powerUnit: "kW",
        batteryCapacity: 75,
        batteryUnit: "kWh"
      },
      price: 424000,
      currency: "₹",
      isFeatured: true,
      isWishlisted: false
    },
    {
      id: 4,
      name: "EVall Ace EV",
      category: "light-duty",
      tagline: "4.0 D5 PowerPulse Momentum 5dr AW...",
      image: "4wheel-XLR.webp ",
      status: "available",
      badge: "Available",
      badgeColor: "green",
      specs: {
        range: 500,
        rangeUnit: "km",
        power: 400,
        powerUnit: "kW",
        batteryCapacity: 75,
        batteryUnit: "kWh"
      },
      price: 539000,
      currency: "₹",
      isFeatured: false,
      isWishlisted: false
    }
  ];
  
  export const categories = [
    { id: 'light-duty', label: 'Light Duty Trucks' },
    { id: 'medium-duty', label: 'Medium-Duty Trucks' },
    { id: 'heavy-duty', label: 'Heavy-Duty Trucks' }
  ];
  
  