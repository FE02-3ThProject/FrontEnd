import styled from "styled-components";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formMembers?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

interface InputFieldProps {
  id: string;
  disabled?: boolean;
  formMembers?: boolean;
  errors: FieldErrors;
}

const InputField = styled.input<InputFieldProps>`
  width: 100%;
  padding: 4px;
  padding-top: 6px;
  font-weight: 300;
  background-color: white;
  border: 2px solid
    ${(props) => (props.errors[props.id] ? "rose" : "neutral-300")};
  border-radius: 4px;
  outline: none;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "auto")};
  padding-left: ${(props) => (props.formMembers ? "9px" : "4px")};

  &:focus {
    border-color: ${(props) =>
      props.errors[props.id] ? "rose-500" : "orange-500"};
  }

  &::placeholder {
    opacity: 0;
  }

  &:placeholder-shown + label {
    transform: scale(1) translateY(0);
  }

  &:not(:placeholder-shown) + label,
  &:focus + label {
    transform: scale(0.75) translateY(-4px);
  }
`;

interface LabelProps {
  id: string;
  formMembers?: boolean;
  errors: FieldErrors;
}
const Label = styled.label<LabelProps>`
  position: absolute;
  font-size: 16px;
  transition-duration: 0.15s;
  transform-origin: 0 0;
  top: 5px;
  z-index: 10;
  left: ${(props) => (props.formMembers ? "9px" : "4px")};
  color: ${(props) => (props.errors[props.id] ? "rose-500" : "zinc-400")};
`;

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formMembers,
  required,
  register,
  errors,
}) => {
  return (
    <InputContainer>
      <InputField
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        formMembers={formMembers}
        errors={errors}
      />
      <Label id={id} htmlFor={id} formMembers={formMembers} errors={errors}>
        {label}
      </Label>
    </InputContainer>
  );
};

export default Input;
