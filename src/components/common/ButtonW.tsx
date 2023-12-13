import styled, { css } from "styled-components";
import { IconType } from "react-icons";
import { RotatingLines } from "react-loader-spinner";

interface ButtonProps {
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  // isLoading?: boolean;
}

const Button = styled.button<ButtonProps>`
  position: relative;
  border-radius: 0.375rem;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  width: 100%;
  background-color: ${({ outline }) => (outline ? "white" : "#ffffff")};
  border-color: ${({ outline }) => (outline ? "black" : "#0F78EE")};
  color: ${({ outline }) => (outline ? "black" : "#0F78EE")};
  font-size: ${({ small }) => (small ? "0.875rem" : "1rem")};
  padding: ${({ small }) => (small ? "0.25rem" : "0.75rem")};
  font-weight: ${({ small }) => (small ? "light" : "bold")};
  border-width: ${({ small }) => (small ? "1px" : "2px")};

  &:hover {
    opacity: 0.8;
    outline: transparent;
  }
  &:focus,
  &:active {
    border: 2px solid #0f78ee;
    outline: transparent;
  }

  /* ${({ isLoading }) =>
    isLoading &&
    css`
      display: flex;
      justify-content: center;
    `} */
`;

const StButtonW: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  // isLoading = false,
}) => {
  return (
    // <Button
    //   type="submit"
    //   disabled={disabled}
    //   onClick={onClick}
    //   outline={outline}
    //   small={small}
    //   isLoading={isLoading}
    // >
    //   {isLoading ? (
    //     <RotatingLines
    //       strokeColor="grey"
    //       strokeWidth="5"
    //       animationDuration="0.75"
    //       width="30"
    //       visible={true}
    //     />
    //   ) : (
    //     <>
    //       {Icon && (
    //         <Icon
    //           size={24}
    //           style={{ position: "absolute", left: "1rem", top: "0.75rem" }}
    //         />
    //       )}
    //       {label && <span>{label}</span>}
    //     </>
    //   )}
    // </Button>
    <Button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      outline={outline}
      small={small}
    >
      <>
        {Icon && (
          <Icon
            size={24}
            style={{ position: "absolute", left: "1rem", top: "0.75rem" }}
          />
        )}
        {label && <span>{label}</span>}
      </>
    </Button>
  );
};

export default StButtonW;
