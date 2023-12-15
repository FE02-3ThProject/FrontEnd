import axios from "axios";
import { useState, useEffect, useCallback } from "react";

interface UseFavorite {
  meetingId: string;
  currentUser?: string | null;
}

const useFavorite = ({ meetingId, currentUser }: UseFavorite) => {
  const [hasFavorite, setHasFavorite] = useState(false);

  const fetchFavorite = useCallback(async () => {
    if (currentUser) {
      const response = await axios.get(`/api/users/${currentUser}`);
      const favoriteIds = response.data.favoriteIds || [];
      setHasFavorite(favoriteIds.includes(meetingId));
    }
  }, [currentUser, meetingId]);

  useEffect(() => {
    fetchFavorite();
  }, [fetchFavorite]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return;
    }

    try {
      let request;

      if (hasFavorite) {
        request = () => axios.delete(`/api/favorites/${meetingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${meetingId}`);
      }

      await request();
      window.location.reload(); // 페이지를 새로고침합니다.
    } catch (err) {
      console.log("error");
    }
  };

  return {
    hasFavorite,
    toggleFavorite,
  };
};

export default useFavorite;
