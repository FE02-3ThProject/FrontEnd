import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
  groupId: string;
  userId?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  favoriteIds?: string[];
}

const FavoriteButton = styled.div`
  position: relative;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const HeartOutline = styled(AiOutlineHeart)`
  position: absolute;
  fill: white;
  top: 2px;
  right: 2px;
`;

const HeartFill = styled(AiFillHeart)<{ favorite: boolean }>`
  fill: ${(props) => (props.favorite ? "#F43F5E" : "#9CA3AF70")};
`;

const HeartButton = ({ groupId, userId }: HeartButtonProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const response = await axios.get(`/api/users/${userId}`);
        setCurrentUser(response.data);
      }
    };

    fetchUser();
  }, [userId]);

  console.log(currentUser);

  const { hasFavorite, toggleFavorite } = useFavorite({
    groupId,
    currentUser: userId, // userId를 currentUser로 전달
  });

  return (
    <FavoriteButton onClick={toggleFavorite}>
      <HeartOutline size={28} />
      <HeartFill size={24} favorite={hasFavorite} />
    </FavoriteButton>
  );
};

export default HeartButton;
