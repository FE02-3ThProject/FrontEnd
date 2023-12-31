import { Link, useParams } from "react-router-dom";
import { apiToken } from "../../shared/apis/Apis";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";

//image import
import Banner from "../../images/meeting/Group-559.png";

interface StLeftFormProps {
  meetingImage?: string;
}

interface MemberType {
  userId: number;
  email: string;
  nickname: string;
  image?: string;
  role: string;
}

interface MemberActionParams {
  groupId: string;
  userId: number;
}

//모임 상세정보 조회
const fetchDetails = async (groupId: number | undefined) => {
  const response = await apiToken.get(`/api/group/detail/${groupId}`);
  return response.data;
};

//모임 맴버 조회
const fetchMembers = async (groupId: number | undefined) => {
  const response = await apiToken.get(`api/group/groupMembers/${groupId}`);
  return response.data;
};

//모임 맴버 추방
const kickedMember = async ({ groupId, userId }: MemberActionParams) => {
  try {
    const response = await apiToken.post(
      `/api/group/${groupId}/kick/${userId}`
    );
    return response.data;
  } catch (error) {
    alert(error);
  }
};

//방장 권한 이전
const changeLeader = async ({ groupId, userId }: MemberActionParams) => {
  try {
    const response = await apiToken.post(
      `/api/group/${groupId}/transferLeader/${userId}`
    );
    return response.data;
  } catch (error) {
    alert(error);
  }
};

const MeetingMemberPage = () => {
  const meetingId = useParams().meetingId;
  const groupId = meetingId;
  const queryClient = useQueryClient();

  const { data: meeting } = useQuery(["meeting"], () =>
    fetchDetails(Number(groupId))
  );
  const { data: members } = useQuery(["members"], () =>
    fetchMembers(Number(groupId))
  );

  const kickedMemberMutation = useMutation(kickedMember, {
    onSuccess: () => {
      queryClient.invalidateQueries("members");
    },
  });

  const changeLeaderMutation = useMutation(changeLeader, {
    onSuccess: () => {
      queryClient.invalidateQueries("members");
    },
  });

  const MeetingImage = meeting && meeting.image;

  return (
    <StContainer>
      <StForm>
        <StLeftForm meetingImage={MeetingImage}>
          <StProfileSec>
            <StTitle>{meeting && meeting.title}</StTitle>
            <StDesc>{meeting && meeting.description}</StDesc>
            <StProfile>
              <StProfileImg src={meeting && meeting?.leaderProfilePicture} />
              <StProfileRight>
                <StNickName>{meeting && meeting.leaderNickname}</StNickName>
                <StProfileDesc>
                  <p>
                    {meeting && meeting.joinedGroupMembers}/
                    {meeting && meeting.maxMembers}
                  </p>
                  |<p>개설일 {meeting && meeting.createdAt}</p>
                </StProfileDesc>
              </StProfileRight>
            </StProfile>
          </StProfileSec>
        </StLeftForm>
        <StMemberSec>
          <StMemberContainer>
            {members &&
              members
                .sort((_: MemberType, b: MemberType) =>
                  b.role === "LEADER" ? 1 : -1
                )
                .map((member: MemberType) => (
                  <StMemberProfile key={member.userId}>
                    <StMemberName>
                      <StMemberNameRole>{member.nickname}</StMemberNameRole>
                      <StMemberNameRole>역할 : {member.role}</StMemberNameRole>
                    </StMemberName>
                    <StMemberButton>
                      {member && meeting && member.role === "MEMBER" ? (
                        <>
                          <StButton
                            onClick={() => {
                              if (groupId) {
                                kickedMemberMutation.mutate({
                                  groupId: groupId,
                                  userId: member.userId,
                                });
                              }
                            }}
                          >
                            추방
                          </StButton>
                          <StButton
                            onClick={() => {
                              if (groupId) {
                                changeLeaderMutation.mutate({
                                  groupId: groupId,
                                  userId: member.userId,
                                });
                              }
                            }}
                          >
                            권한 변경
                          </StButton>
                        </>
                      ) : (
                        <></>
                      )}
                    </StMemberButton>
                  </StMemberProfile>
                ))}
          </StMemberContainer>
          <Link to={`/meeting/${groupId}`}>
            <StBackButton>돌아가기</StBackButton>
          </Link>
        </StMemberSec>
      </StForm>
    </StContainer>
  );
};

export default MeetingMemberPage;

const StContainer = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${Banner});
  background-size: 100% auto;
  background-position: top;
  background-repeat: no-repeat;
`;

const StForm = styled.div`
  display: flex;
  width: 1100px;
  height: 630px;
  border-radius: 30px;
  box-shadow: 11px 13px 4px 0px #0000001a;
  margin-top: 50px;
  margin-bottom: 50px;
  background-color: white;
`;

const StLeftForm = styled.div<StLeftFormProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 460px;
  height: 630px;
  border-radius: 30px;
  background-color: gray;
  background-image: url(${(props) => props.meetingImage});
  background-size: cover;
  background-position: center;
`;

const StProfileSec = styled.div`
  margin: 0 auto;
`;

const StTitle = styled.h2`
  color: #ffffff;
  font-size: 44px;
  font-weight: 700;
  margin-bottom: 50px;
`;

const StDesc = styled.p`
  width: 350px;
  height: auto;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  line-height: 23px;
  margin-bottom: 40px;
`;

const StProfile = styled.div`
  color: #ffffff;
  display: flex;
  margin-bottom: 30px;
`;

const StProfileImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;

const StProfileRight = styled.div`
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
`;

const StNickName = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const StProfileDesc = styled.div`
  display: flex;
  gap: 10px;
`;

const StMemberSec = styled.section`
  width: 640px;
  height: 630px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StBackButton = styled.button`
  width: 150px;
  height: 35px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
  position: absolute;
  right: 15px;
  bottom: 15px;
`;

const StMemberContainer = styled.div`
  width: 566px;
  height: 500px;
  background-color: #e0e0e0;
  border-radius: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  overflow: auto;
`;

const StMemberProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  height: 30px;
  margin-left: 10px;
  margin-top: 10px;
  color: black;
  gap: 15px;
`;

const StMemberName = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  width: 220px;
`;

const StMemberButton = styled.div`
  display: flex;
  gap: 15px;
`;

const StButton = styled.button`
  width: 120px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StMemberNameRole = styled.div`
  height: 30px;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 5px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
