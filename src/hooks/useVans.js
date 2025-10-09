import { useState, useEffect } from 'react';
import vanService from '../services/vanService';

const useVans = () => {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVans = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await vanService.getAllVans();
        setVans(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVans();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await vanService.getAllVans();
      setVans(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { vans, loading, error, refetch };
};

export default useVans;