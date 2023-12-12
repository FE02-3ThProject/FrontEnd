import styled from "styled-components";

const Post = () => {
  return (
    <StContainer>
      <StTitle>게시글 타이틀</StTitle>
      <StContent>게시글 내용 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</StContent>
    </StContainer>
  );
};

export default Post;

const StContainer = styled.div`
  width: 600px;
  height: 30px;
  text-indent: 15px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const StTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
`;

const StContent = styled.p`
  font-size: 12px;
`;
