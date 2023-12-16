import SearchImg from "../../images/searchpage_bg.png";
import styled from "styled-components";
import AvatarImg from "../../images/avatar_default.png";

interface SearchResult {
  image: string;
  title: string;
  description: string;
  memberCount: number;
  maxMembers: number;
  createdAt: string;
}

const SearchCard = ({ result }: { result: SearchResult }) => {
  return (
    <StSearchCard>
      <StMeetingImg>
        <img src={result.image} alt={result.title} />
      </StMeetingImg>
      <StSearchInfo>
        <h4>{result.title}</h4>
        <StSearchTxt>
          <StAvatar2></StAvatar2>
          <StMeetingInfo>
            <h5>{result.description}</h5>
            <p>
              {result.memberCount}/{result.maxMembers} | 개설일{" "}
              {result.createdAt}
            </p>
          </StMeetingInfo>
        </StSearchTxt>
      </StSearchInfo>
    </StSearchCard>
  );
};

export default SearchCard;

const StAvatar2 = styled.div`
  margin-right: 12px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-image: url(${AvatarImg});
`;

const StSearchCard = styled.div`
  display: flex;
  width: 1098px;
  height: 195px;
  background-color: #262d34;
  border-radius: 20px;
  margin-bottom: 20px;
`;

const StMeetingImg = styled.div`
  width: 300px;
  height: 162px;
  background-image: url(${SearchImg});
  margin: 18px 22px;
`;

const StSearchInfo = styled.div`
  color: #fff;
  margin-top: 25px;
  h4 {
    font-size: 18px;
  }
`;

const StSearchTxt = styled.div`
  display: flex;
  margin-top: 75px;
`;

const StMeetingInfo = styled.div`
  margin-top: 3px;
  h5 {
    margin-bottom: 8px;
  }
`;
