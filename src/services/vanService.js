import api from './api';

// Transform backend response to match your frontend format
const transformVan = (van) => ({
  id: van.id,
  name: van.name,
  category: van.category,
  tagline: van.tagline,
  images: van.images,
  status: van.status,
  badge: van.badge,
  badgeColor: van.badge_color,
  chargingType: van.charging_type,
  specs: {
    range: van.specs.range,
    rangeUnit: 'km',
    power: van.specs.power,
    powerUnit: 'kW',
    batteryCapacity: van.specs.battery,
    batteryUnit: 'kWh',
    payload: van.specs.payload
  },
  price: van.price,
  currency: van.currency,
  isFeatured: van.is_featured,
  isWishlisted: van.is_wishlisted
});

const vanService = {
  // Get all vans
  getAllVans: async () => {
    try {
      const response = await api.get('/vans/');
      return response.data.results.map(transformVan);
    } catch (error) {
      throw new Error('Failed to fetch vans. Please try again.');
    }
  },

  // Get single van by ID
  getVanById: async (id) => {
    try {
      const response = await api.get(`/vans/${id}/`);
      return transformVan(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Van not found.');
      }
      throw new Error('Failed to fetch van details. Please try again.');
    }
  }
};

export default vanService;