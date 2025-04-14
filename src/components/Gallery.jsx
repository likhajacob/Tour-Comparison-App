import React, {useEffect, useState} from "react";
import TourCard from "./TourCard";

// Gallery renders tour list

const Gallery = ({tours, setTours, onRemove}) => {
    // Local state manages loading and errors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const url = "/api/react-tours-project";

    // Function to fetch tours from API

    const fetchTours = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Map API data to the field we need only
            const data = await response.json();
            const trimmed = Array.isArray(data) ? data.map((tour) => ({
                id: tour.id,
                name: tour.name,
                price: tour.price || "Unknown",
                info: `Tour Details: ${tour.info ? tour.info.slice(0, 50) : "No information provided."}`,
                image: tour.image
            })) : [];
            setTours(trimmed); // Save data to global state
            setLoading(false);
        } catch (error) {
            setError(true); // Show error if fetch fails
            setLoading(false); //
        }
    };

    // Run fetchtours after the component mounts
    useEffect(() => {
        fetchTours();
    }, []);

    // Render loading state

    if (loading) {
        return <h2>Loading...</h2>;
    }
    // Render error state
    if (error) {
        return <h2>Something went wrong...</h2>
    }
    // Render if no tours available
    if (tours.length === 0) {
            return (
                <div>
                    <h2>No Tours Available</h2>
                    <button onClick={() => fetchTours()}>Refresh</button>
                </div>
            );
        }
   
        // Render the list of TourCards
        return (
            <section className="tour-list">
                {tours.map((tour) => (
                    <TourCard
                        key={tour.id}
                        {...tour} 
                        onRemove={onRemove} 
                    />
                ))}
            </section>
        );
    };


export default Gallery;


