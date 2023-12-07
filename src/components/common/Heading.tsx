import styled from "styled-components";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const StHeadingContainer = styled.div<{ center: boolean }>`
  text-align: ${(props) => (props.center ? "center" : "start")};
`;

const StTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const StSubtitle = styled.div`
  font-weight: light;
  color: #9ca3af;
  margin-top: 0.5rem;
`;

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center = false,
}) => {
  return (
    <StHeadingContainer center={center}>
      <StTitle>{title}</StTitle>
      <StSubtitle>{subtitle}</StSubtitle>
    </StHeadingContainer>
  );
};

export default Heading;
