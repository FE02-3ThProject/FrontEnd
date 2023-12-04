import { ChangeEvent, FC } from "react";
import styled from "styled-components";

interface CategoryProps {
  value: string;
  onChange: (value: string) => void;
}

export const Category: FC<CategoryProps> = ({ value, onChange }) => {
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <StInput value={value} onChange={handleCategoryChange} required>
      <option value="">카테고리를 선택해 주세요</option>
      <option value="스포츠">스포츠</option>
      <option value="예술">예술</option>
      <option value="음악">음악</option>
    </StInput>
  );
};

export default Category;

const StInput = styled.select`
  width: 92%;
  height: 32px;
  font-size: 15px;
  margin-top: 5px;
  margin-left: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
`;
