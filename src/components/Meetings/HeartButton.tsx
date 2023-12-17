import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";

interface HeartButtonProps {
  groupId: string; // group의 id
  userId?: string; // User의 id
}

const HeartButton = ({ groupId, userId }: HeartButtonProps) => {
  const [hasFavorite, setHasFavorite] = useState(false);

  const checkFavorite = async () => {
    try {
      const response = await fetch(`/api/favorites/${groupId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`, // 사용자 인증 정보
        },
      });
      const data = await response.json();
      setHasFavorite(data.hasFavorite);
    } catch (error) {
      console.error("Failed to check favorite:", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const response = await fetch(`/api/favorites/${groupId}`, {
        method: hasFavorite ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`, // 사용자 인증 정보
        },
      });
      const data = await response.json();
      setHasFavorite(data.hasFavorite);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  useEffect(() => {
    checkFavorite();
  }, []);

  return (
    <HeartButtonStyled onClick={toggleFavorite}>
      <AiOutlineHeart
        size={28}
        className="absolute fill-white -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </HeartButtonStyled>
  );
};

const HeartButtonStyled = styled.div`
  position: relative;
  cursor: pointer;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.8;
  }
  .fill-white {
    fill: white;
  }
  .fill-rose-500 {
    fill: #f43f5e;
  }
  .fill-neutral-500 {
    fill: #9ca3af;
  }
  .absolute {
    position: absolute;
    top: -2px;
    right: -2px;
  }
`;

export default HeartButton;
