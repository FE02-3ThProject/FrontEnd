import styled from "styled-components";
import { IconType } from "react-icons";
// import { TUser } from "@/types";
import Avatar from "../Avatar";
// import { formatTime } from "@/helpers/dayjs";
import MeetingCategory from "./MeetingCategory";
import { FormatTime } from "../FormatTime";

interface ProductInfoProps {
  // user: TUser;
  description: string;
  createdAt: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
}

const StMeetingInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StUserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

const StUserTime = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  font-weight: 300;
  color: #9ca3af;
`;

const StMeetingDescription = styled.div`
  font-size: 1.125rem;
  font-weight: 300;
  color: #9ca3af;
`;

const MeetingInfo: React.FC<ProductInfoProps> = ({
  // user,
  description,
  category,
  createdAt,
}) => {
  // console.log(user);
  return (
    <StMeetingInfoContainer>
      <StUserContainer>
        <StUserInfo>
          <Avatar
            // src={user?.image}
            src={"유저이미지"}
          />
          <div>
            {/* {user?.name} */}
            유저네임
          </div>
        </StUserInfo>
        <StUserTime>
          <div>{FormatTime(createdAt)}</div>
        </StUserTime>
      </StUserContainer>
      <hr />
      {category && (
        <MeetingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <StMeetingDescription>{description}</StMeetingDescription>
    </StMeetingInfoContainer>
  );
};

export default MeetingInfo;
