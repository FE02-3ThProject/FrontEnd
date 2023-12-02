import { ChangeEvent, FC } from "react";

interface CategoryProps {
  value: string;
  onChange: (value: string) => void;
}

export const Category: FC<CategoryProps> = ({ value, onChange }) => {
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select value={value} onChange={handleCategoryChange} required>
      <option value="">카테고리를 선택해 주세요</option>
      <option value="스포츠">스포츠</option>
      <option value="예술">예술</option>
      <option value="음악">음악</option>
    </select>
  );
};

export default Category;
