import { useState, useEffect } from 'react';
import vanService from '../services/vanService';

const useVan = (id) => {
  const [van, setVan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchVan = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await vanService.getVanById(id);
        setVan(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVan();
  }, [id]);

  return { van, loading, error };
};

export default useVan;