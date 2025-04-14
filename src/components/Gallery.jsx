import { useEffect, useState } from 'react';
import TourCard from './TourCard';

// Using a CORS Proxy to Avoid Local Fetch Issues
const url = 'https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project';

function Gallery({ tours, setTours, onRemove }) {
  const [loading, setLoading] = useState(true); // Tracks Loading State
  const [error, setError] = useState(false); // Tracks Error State

  // Fetch Tours on Component Mount
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setTours(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchTours(); // Triggers Fetch on Mount
  }, []);

  // Handle Loading and Error States
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error fetching tours. Try again later.</h2>;

  // Renders the List of Tour Cards
  return (
    <section className="gallery">
      {tours.map(tour => (
        <TourCard key={tour.id} {...tour} onRemove={onRemove} />
      ))}
    </section>
  );
}

export default Gallery;
