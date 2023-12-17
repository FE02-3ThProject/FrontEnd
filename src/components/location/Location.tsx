import { ChangeEvent, FC } from "react";
import styled from "styled-components";

interface LocationProps {
  value: string;
  onChange: (value: string) => void;
  width?: string;
  height?: string;
  fontSize?: string;
  boxShadow?: string;
}
interface StInputProps {
  width?: string;
  height?: string;
  fontSize?: string;
  boxShadow?: string;
}

export const Location: FC<LocationProps> = ({ value, onChange, width, height, fontSize, boxShadow }) => {
  const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <StInput width={width} height={height} fontSize={fontSize} boxShadow={boxShadow} value={value} onChange={handleLocationChange} required>
      <option value="">지역을 선택해 주세요</option>
      <option value="1">서울</option>
      <option value="2">경기도</option>
      <option value="3">인천</option>
      <option value="4">강원도</option>
      <option value="5">충청남도</option>
      <option value="6">대전</option>
      <option value="7">충청북도</option>
      <option value="8">세종시</option>
      <option value="9">부산</option>
      <option value="10">울산</option>
      <option value="11">대구</option>
      <option value="12">경상북도</option>
      <option value="13">경상남도</option>
      <option value="14">전라남도</option>
      <option value="15">광주</option>
      <option value="16">전라북도</option>
      <option value="17">제주도</option>
    </StInput>
  );
};

export default Location;

const StInput = styled.select<StInputProps>`
  width: ${(props) => props.width || "554px"};
  height: ${(props) => props.height || "61px"};
  font-size: ${(props) => props.fontSize || "26px"};
  box-shadow: ${(props) => props.boxShadow};
  margin-top: 5px;
  margin-left: 10px;
  border: 1px solid #909090;
  text-indent: 15px;
  outline: none;
  &:focus {
    border: 1px solid #1981f9;
  }
`;
