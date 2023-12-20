import { ChangeEvent, FC } from "react";
import styled from "styled-components";

interface CategoryProps {
  value: string;
  onChange: (value: string) => void;
  width?: string;
  height?: string;
  fontSize?: string;
  boxshadow?: string;
}

interface StInputProps {
  width?: string;
  height?: string;
  fontSize?: string;
  boxshadow?: string;
}

export const Category: FC<CategoryProps> = ({ value, onChange, width, height, fontSize, boxshadow }) => {
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <StInput width={width} height={height} fontSize={fontSize} boxshadow={boxshadow} value={value} onChange={handleCategoryChange} required>
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

const StInput = styled.select<StInputProps>`
  width: ${(props) => props.width || "554px"};
  height: ${(props) => props.height || "61px"};
  font-size: ${(props) => props.fontSize || "26px"};
  box-shadow: ${(props) => props.boxshadow || "0px 0px 0px 0px #000000"};
  margin-top: 5px;
  margin-left: 10px;
  border: 1px solid #909090;
  outline: none;
  text-indent: 15px;
  &:focus {
    border: 1px solid #1981f9;
  }
`;
