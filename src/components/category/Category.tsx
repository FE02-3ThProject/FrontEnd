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
      <option value="1">게임</option>
      <option value="2">여행</option>
      <option value="3">운동</option>
      <option value="4">책</option>
      <option value="5">직무</option>
      <option value="6">언어</option>
      <option value="7">공연</option>
      <option value="8">음악</option>
      <option value="9">공예</option>
      <option value="10">댄스</option>
    </StInput>
  );
};

export default Category;

const StInput = styled.select`
  width: 554px;
  height: 61px;
  font-size: 26px;
  margin-top: 5px;
  margin-left: 10px;
  border: 1px solid #909090;
  outline: none;
  &:focus {
    border: 1px solid #1981f9;
  }
`;
