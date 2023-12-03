// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
import styled from "styled-components";
// import HeartButton from "../HeartButton";

// interface MeetingCardProps {
//   groupId: string; // group의 id
//   userId?: string; // User의 id
// }

const StCardContainer = styled.div`
  width: 200px;
  margin: 50px 0 50px 70px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const StMContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 15px;
  background-size: contain;
  background-image: url("https://images.pexels.com/photos/19235974/pexels-photo-19235974.jpeg?auto=compress&cs=tinysrgb&w=1600");
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
  font-size: 18px;
  font-weight: 600;
`;

const StCategory = styled.div`
  color: #9ca3af;
  font-weight: 300;
`;

const MeetingCard = () => {
  // const navigate = useNavigate();

  // const [group, setGroup] = useState(null);
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const fetchGroup = async () => {
  //     const response = await axios.get(`/api/groups/${groupId}`);
  //     setGroup(response.data);
  //   };

  //   const fetchUser = async () => {
  //     const response = await axios.get(`/api/users/${userId}`);
  //     setUser(response.data);
  //   };

  //   fetchGroup();
  //   fetchUser();
  // }, [groupId, userId]);

  // if (!group || !user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <StCardContainer>
      <StMContainer>
        <StImageContainer>
          <StyledImage src={"이미지"} alt="group" />
          <StTopRightButton>
            {/* <HeartButton groupId={group} userId={userId} /> */}
          </StTopRightButton>
        </StImageContainer>

        <StTitle>Title</StTitle>
        <StCategory>category</StCategory>
        <div>
          <div>
            100000 <span className="font-light ">명</span>
          </div>
          <div>{/* {group.createdAt} */}</div>
        </div>
      </StMContainer>
    </StCardContainer>
  );
};

export default MeetingCard;
