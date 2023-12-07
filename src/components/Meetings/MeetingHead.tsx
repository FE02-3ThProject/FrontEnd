import styled from "styled-components";
import Heading from "../common/Heading";
import HeartButton from "../common/HeartButton";

interface ProductHeadProps {
  title: string;
  imageSrc: string;
  id: string;
  userId?: string;
}

const StImageContainer = styled.div`
  width: 100%;
  height: 60vh;
  overflow: hidden;
  border-radius: 1rem;
  position: relative;
`;

const StImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const StHeartButton = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
`;

const ProductHead: React.FC<ProductHeadProps> = ({
  title,
  imageSrc,
  id,
  userId,
}) => {
  return (
    <>
      <Heading title={title} />
      <StImageContainer>
        <StImage src={imageSrc} alt="Image" />
        <StHeartButton>
          <HeartButton groupId={id} userId={userId} />
        </StHeartButton>
      </StImageContainer>
    </>
  );
};

export default ProductHead;
