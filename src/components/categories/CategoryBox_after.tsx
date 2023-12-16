import React from "react";
import styled from "styled-components";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  path: string;
  selected?: boolean;
  onSelect: (category: string) => void; // 새로 추가
}
const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  path,
  selected,
  onSelect, // 새로 추가
}) => {
  return (
    <StLink
      to={`/?category=${path}`}
      selected={selected}
      onClick={() => onSelect(path)}
    >
      {/* <StLink to={`/api/group/category/${path}`} selected={selected}> */}
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
