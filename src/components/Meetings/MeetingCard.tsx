import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import HeartButton from "../common/HeartButton";

interface Group {
  groupId: string;
  locationName: string;
  categoryName: string;
  title: string;
  description: string;
  image: string;
  maxMembers: number;
  createdAt: string;
  userId: string;
}
interface MeetingCardProps {
  group: Group;
}

const MeetingCard = ({ group }: MeetingCardProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`meeting/${group.groupId}`);
  }, [group, navigate]);

  return (
    <StCardContainer onClick={() => navigate(`meeting/${group.groupId}`)}>
      <StContainer>
        <StImageContainer>
          <StyledImage src={group.image} alt="group" />
          <StTopRightButton>
            <HeartButton groupId={group.groupId} userId={group.userId} />
          </StTopRightButton>
        </StImageContainer>

        <StTitle>{group.title}</StTitle>
        <StCategory>{group.categoryName}</StCategory>
        <div>
          <div>
            {group.maxMembers} <span className="font-light ">명</span>
          </div>
          <div>{group.createdAt}</div>
        </div>
      </StContainer>
    </StCardContainer>
  );
};

export default MeetingCard;

const StCardContainer = styled.div`
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const StImageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 1;
  border-radius: 1rem;
`;

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

const StTopRightButton = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
`;

const StTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
`;

const StCategory = styled.div`
  color: #9ca3af;
  font-weight: 300;
`;
