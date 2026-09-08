import { useState, useEffect, useRef } from 'react';
import { exerciseOptions } from './fetchData';

// Cache to store fetched image URLs to prevent duplicate requests
const imageCache = new Map();

export const useExerciseImage = (exerciseId, resolution = 720) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Ref to prevent state updates on unmounted components
  const isMounted = useRef(true);

  useEffect(() => {
    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!exerciseId) {
      setImageUrl('');
      setLoading(false);
      setError(null);
      return;
    }

    // Create cache key
    const cacheKey = `${exerciseId}-${resolution}`;
    
    // Check cache first
    if (imageCache.has(cacheKey)) {
      if (isMounted.current) {
        setImageUrl(imageCache.get(cacheKey));
        setLoading(false);
        setError(null);
      }
      return;
    }

    // Fetch image if not in cache
    const fetchImage = async () => {
      if (isMounted.current) {
        setLoading(true);
        setError(null);
      }

      try {
        const response = await fetch(
          `https://exercisedb.p.rapidapi.com/image?exerciseId=${exerciseId}&resolution=${resolution}`,
          exerciseOptions
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status}`);
        }
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        // Cache the result
        imageCache.set(cacheKey, url);
        
        if (isMounted.current) {
          setImageUrl(url);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching exercise image:', err);
        if (isMounted.current) {
          setImageUrl('');
          setLoading(false);
          setError(err.message);
        }
      }
    };

    fetchImage();

    // Cleanup: revoke object URLs when component unmounts or dependencies change
    return () => {
      // Note: We don't revoke cached URLs here as they're reused
      // In a real app, you might want to implement cache limits and cleanup
    };
  }, [exerciseId, resolution, isMounted]); // Only refetch if exerciseId or resolution changes

  return { imageUrl, loading, error };
};
