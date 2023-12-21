import styled from "styled-components";

interface PostProps {
  data: {
    id: string;
    title: string;
    content: string;
    postedAt: string;
    email: string;
  };
}

const Post: React.FC<PostProps> = ({ data }) => {
  return (
    <StContainer>
      <div>
        <StTitle>{data.title}</StTitle>
        <StContent>{data.content}</StContent>
      </div>
      <div>
        <StDate>작성일 : {data.postedAt}</StDate>
        <StName>작성자 : {data.email}</StName>
      </div>
    </StContainer>
  );
};

export default Post;

const StContainer = styled.div`
  width: 480px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  margin-top: 10px;
  margin-bottom: 5px;
  color: black;
`;

const StTitle = styled.h3`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
`;

const StContent = styled.p`
  font-size: 12px;
  margin-top: 10px;
  font-weight: 500;
`;

const StDate = styled.p`
  font-size: 12px;
  margin-top: 10px;
  font-weight: 500;
`;

const StName = styled.p`
  font-size: 12px;
  margin-top: 10px;
  font-weight: 500;
`;
