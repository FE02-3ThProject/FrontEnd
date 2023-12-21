import React from "react";
import styled from "styled-components";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  path: string;
  value: number; // value 추가
  selected?: boolean;
  onSelect: (value: number) => void; // onSelect 함수 prop 추가
}
const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  value, // value 받아오기
  selected,
  onSelect, // onSelect 함수 prop 받아오기
}) => {
  // 카테고리 선택 핸들러
  const handleClick = () => {
    onSelect(value); // 카테고리가 선택되었을 때 onSelect 함수를 호출
  };
  return (
    <StLink
      to={`/?category=${value}`}
      selected={selected}
      onClick={handleClick}
    >
      {/* <StLink to={`/api/group/category/${value}`} selected={selected}> */}
      <Icon size={26} />
      <StIconLabel>{label}</StIconLabel>
    </StLink>
  );
};

export default CategoryBox;

interface StLinkProps {
  selected?: boolean;
}

const StLink = styled(Link)<StLinkProps>`
  display: flex;
  flex-direction: column;
  /* width: 150px;
  height: 100px; */
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 30px 20px;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: ${(props) => (props.selected ? "#333" : "#999")};

  &:hover {
    color: #333;
  }

  ${(props) =>
    props.selected &&
    `
  border-bottom-color: #333;
  color: #333;
`}
`;

const StIconLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 15px;
`;
