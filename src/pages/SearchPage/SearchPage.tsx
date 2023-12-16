import styled from "styled-components";
import AvatarImg from "../../images/avatar_default.png";
import SearchCard from "../../components/search/SearchCard";
import { useState, ChangeEvent } from "react";
import { apiToken } from "../../shared/apis/Apis";

const SearchPage = () => {
  const [title, setTitle] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    // 서버에 검색 요청을 보냅니다.
    const response = await apiToken.get(
      `/api/group/title/${encodeURIComponent(title)}`
    );

    if (response.status === 200) {
      // 요청이 성공적으로 완료되면, 검색 결과를 상태변수에 저장합니다.
      setSearchResults(response.data);
    } else {
      // 요청이 실패하면, 오류 메시지를 로그에 출력합니다.
      console.error(`Search failed: ${response.statusText}`);
    }
  };

  return (
    <Stcontainer>
      <StSearchTop>
        <StAvatar></StAvatar>
        <StInputArea>
          <StInput
            type="text"
            placeholder="지금무슨생각을 하고 있나요?"
            value={title}
            onChange={handleInputChange}
          />
        </StInputArea>
        <StSearchButton onClick={handleSubmit}>Create Post</StSearchButton>
      </StSearchTop>
      <StSearchCon>
        {searchResults.map((result, index) => (
          <SearchCard key={index} result={result} />
        ))}
      </StSearchCon>
    </Stcontainer>
  );
};

export default SearchPage;

const Stcontainer = styled.div`
  width: 1098px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StSearchTop = styled.div`
  display: flex;
  align-items: center;
  width: 1098px;
  height: 85px;
  margin: 17px 0;
  border-radius: 20px;
  background-color: #262d34;
`;

const StAvatar = styled.div`
  margin: 12px 28px 12px 21px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-image: url(${AvatarImg});
`;

const StInputArea = styled.div``;

const StInput = styled.input`
  width: 820px;
  height: 56px;
  margin-right: 20px;
  background-color: #2c353d;
  border: none;
  border-radius: 10px;
  padding-left: 15px;
  color: #fff;
`;

const StSearchButton = styled.button`
  background-color: #ff6934;
  color: #fff;
  font-weight: 400;
`;

const StSearchCon = styled.div``;
