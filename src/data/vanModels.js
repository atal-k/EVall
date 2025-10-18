// tco_models.js
const MODELS = {
    ev: [
      {
        id: "ev01",
        name: "E-Truck Mini 1",
        manufacturer: "GreenMove",
        type: "EV",
        price: 800000,
        incentive: 50000,
        battery_kWh: 20,
        range_km: 150,
        ev_eff_100: 15,          // 15 kWh / 100km
        maintenance_estimate_per_year: 6000,
        insurance_percent: 1.5,
        warranty_years: 3,
        notes: "Light-load urban mini truck"
      },
      {
        id: "ev02",
        name: "E-Auto Cargo S",
        manufacturer: "UrbanEV",
        type: "EV",
        price: 450000,
        incentive: 30000,
        battery_kWh: 10,
        range_km: 120,
        ev_eff_100: 10,
        maintenance_estimate_per_year: 4000,
        insurance_percent: 1.2,
        warranty_years: 2
      },
      {
        id: "ev03",
        name: "E-Truck Mini 2",
        manufacturer: "VoltHaul",
        type: "EV",
        price: 950000,
        incentive: 60000,
        battery_kWh: 30,
        range_km: 200,
        ev_eff_100: 16,
        maintenance_estimate_per_year: 7000,
        insurance_percent: 1.6,
        warranty_years: 4
      },
      {
        id: "ev04",
        name: "E-Auto Metro",
        manufacturer: "eRick",
        type: "EV",
        price: 380000,
        incentive: 25000,
        battery_kWh: 8,
        range_km: 100,
        ev_eff_100: 9,
        maintenance_estimate_per_year: 3500,
        insurance_percent: 1.2
      },
      {
        id: "ev05",
        name: "E-Load Pro",
        manufacturer: "CarryEV",
        type: "EV",
        price: 1200000,
        incentive: 80000,
        battery_kWh: 40,
        range_km: 240,
        ev_eff_100: 17,
        maintenance_estimate_per_year: 9000,
        insurance_percent: 1.8
      },
      {
        id: "ev06",
        name: "CityHaul Mini",
        manufacturer: "GreenMove",
        type: "EV",
        price: 700000,
        incentive: 40000,
        battery_kWh: 18,
        range_km: 140,
        ev_eff_100: 13,
        maintenance_estimate_per_year: 5500,
        insurance_percent: 1.5
      },
      {
        id: "ev07",
        name: "E-Auto Compact",
        manufacturer: "AutoVolt",
        type: "EV",
        price: 420000,
        incentive: 25000,
        battery_kWh: 9,
        range_km: 110,
        ev_eff_100: 9.5,
        maintenance_estimate_per_year: 3800,
        insurance_percent: 1.2
      },
      {
        id: "ev08",
        name: "MiniCargo EV",
        manufacturer: "VoltHaul",
        type: "EV",
        price: 880000,
        incentive: 55000,
        battery_kWh: 22,
        range_km: 160,
        ev_eff_100: 14,
        maintenance_estimate_per_year: 6500,
        insurance_percent: 1.5
      },
      {
        id: "ev09",
        name: "E-Auto XL",
        manufacturer: "UrbanEV",
        type: "EV",
        price: 500000,
        incentive: 35000,
        battery_kWh: 12,
        range_km: 130,
        ev_eff_100: 11,
        maintenance_estimate_per_year: 4200,
        insurance_percent: 1.3
      },
      {
        id: "ev10",
        name: "E-Worker Cargo",
        manufacturer: "CarryEV",
        type: "EV",
        price: 760000,
        incentive: 45000,
        battery_kWh: 19,
        range_km: 150,
        ev_eff_100: 14.5,
        maintenance_estimate_per_year: 6000,
        insurance_percent: 1.5
      }
    ],
  
    ice: [
      {
        id: "ice01",
        name: "ICE-Cargo 1",
        manufacturer: "TradAuto",
        type: "ICE",
        price: 650000,
        fuel_eff_100: 5,   // 5 L/100km
        maintenance_estimate_per_year: 10000,
        insurance_percent: 1.5
      },
      {
        id: "ice02",
        name: "AutoRick Classic",
        manufacturer: "RoadGo",
        type: "ICE",
        price: 320000,
        fuel_eff_100: 6,
        maintenance_estimate_per_year: 9000,
        insurance_percent: 1.3
      },
      {
        id: "ice03",
        name: "CargoLite",
        manufacturer: "LoadPro",
        type: "ICE",
        price: 540000,
        fuel_eff_100: 5.5,
        maintenance_estimate_per_year: 9500,
        insurance_percent: 1.4
      },
      {
        id: "ice04",
        name: "MiniHaul 1.0",
        manufacturer: "TradAuto",
        type: "ICE",
        price: 720000,
        fuel_eff_100: 6,
        maintenance_estimate_per_year: 11000,
        insurance_percent: 1.6
      },
      {
        id: "ice05",
        name: "Rickshaw Pro",
        manufacturer: "RoadGo",
        type: "ICE",
        price: 350000,
        fuel_eff_100: 7,
        maintenance_estimate_per_year: 8500,
        insurance_percent: 1.3
      },
      {
        id: "ice06",
        name: "LoadX",
        manufacturer: "HaulCorp",
        type: "ICE",
        price: 600000,
        fuel_eff_100: 5,
        maintenance_estimate_per_year: 10000,
        insurance_percent: 1.5
      },
      {
        id: "ice07",
        name: "CityTruck",
        manufacturer: "HaulCorp",
        type: "ICE",
        price: 680000,
        fuel_eff_100: 5.8,
        maintenance_estimate_per_year: 10500,
        insurance_percent: 1.6
      },
      {
        id: "ice08",
        name: "UrbanCarry",
        manufacturer: "TradAuto",
        type: "ICE",
        price: 480000,
        fuel_eff_100: 5.2,
        maintenance_estimate_per_year: 9800,
        insurance_percent: 1.4
      },
      {
        id: "ice09",
        name: "CompactHaul",
        manufacturer: "LoadPro",
        type: "ICE",
        price: 530000,
        fuel_eff_100: 5,
        maintenance_estimate_per_year: 9900,
        insurance_percent: 1.4
      },
      {
        id: "ice10",
        name: "WorkMate",
        manufacturer: "RoadGo",
        type: "ICE",
        price: 420000,
        fuel_eff_100: 6.5,
        maintenance_estimate_per_year: 9200,
        insurance_percent: 1.3
      }
    ]
  };
  
  export { MODELS };