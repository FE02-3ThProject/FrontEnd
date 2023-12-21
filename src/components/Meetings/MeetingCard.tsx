import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchImg from "../../images/searchpage_bg.png";

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

  return (
    <StCardContainer onClick={() => navigate(`meeting/${group.groupId}`)}>
      <StContainer>
        <StImageContainer>
          <StImageArea>
            <StyledImage src={group.image} alt="group" />
          </StImageArea>
        </StImageContainer>

        <StTitle>{group.title}</StTitle>
        <StCategory>{group.categoryName}</StCategory>
        <div>
          <div>
            {group.maxMembers}{" "}
            <span className="font-light ">명 | {group.createdAt}</span>
          </div>
          <div></div>
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
  margin: 20px;
`;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const StImageArea = styled.div`
  width: 200px;
  height: 200px;
  background-color: #999;
  background-image: url(${SearchImg});
`;

const StImageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 1;
  border-radius: 17px;
`;

const StyledImage = styled.img`
  object-fit: cover;
  width: 200px;
  height: 200px;
  border-radius: 17px;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

const StTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
`;

const StCategory = styled.div`
  color: #9ca3af;
  font-weight: 300;
`;
