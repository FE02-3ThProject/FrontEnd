import styled from "styled-components";
import { IconType } from "react-icons";

interface MeetingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CategoryRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const CategoryLabel = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
`;

const CategoryDescription = styled.div`
  font-weight: 300;
  color: #9ca3af;
`;

const MeetingCategory: React.FC<MeetingCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    <CategoryContainer>
      <CategoryRow>
        <Icon size={40} className="text-neutral-600" />
        <div>
          <CategoryLabel>{label}</CategoryLabel>
          <CategoryDescription>{description}</CategoryDescription>
        </div>
      </CategoryRow>
    </CategoryContainer>
  );
};

export default MeetingCategory;
