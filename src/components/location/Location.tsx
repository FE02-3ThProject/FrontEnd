import { ChangeEvent, FC } from "react";

interface LocationProps {
  value: string;
  onChange: (value: string) => void;
}

export const Location: FC<LocationProps> = ({ value, onChange }) => {
  const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select value={value} onChange={handleLocationChange} required>
      <option value="">지역을 선택해 주세요</option>
      <option value="경기도">경기도</option>
      <option value="강원도">강원도</option>
      <option value="충청북도">충청북도</option>
      <option value="충청남도">충청남도</option>
      <option value="전라북도">전라북도</option>
      <option value="전라남도">전라남도</option>
      <option value="경상북도">경상북도</option>
      <option value="경상남도">경상남도</option>
      <option value="제주특별자치도">제주특별자치도</option>
    </select>
  );
};

export default Location;
