import React from "react";
import styled, { css } from "styled-components";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  path: string;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
  path,
}) => {
  return (
    <StSelect selected={selected} onClick={() => onClick(path)}>
      <Icon size={30} />
      <StLabel>{label}</StLabel>
    </StSelect>
  );
};

export default CategoryInput;

interface StSelectProps {
  selected?: boolean;
}

const StSelect = styled.div<StSelectProps>`
  border-radius: 1rem;
  border: 2px solid;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: orange;
  }

  ${(props) =>
    props.selected
      ? css`
          border-color: orange;
        `
      : css`
          border-color: #cfcfcf;
        `}
`;

const StLabel = styled.div`
  font-weight: 600;
`;
