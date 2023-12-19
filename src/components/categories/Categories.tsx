import { useParams } from "react-router-dom";
import { GrWorkshop } from "react-icons/gr";
import { SiDuckduckgo } from "react-icons/si";
import { FaBookTanakh } from "react-icons/fa6";
import { SiThemoviedatabase } from "react-icons/si";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiTourbox } from "react-icons/si";
import { SiBytedance } from "react-icons/si";
import { MdSportsHandball } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import styled from "styled-components";
import { SiYoutubemusic } from "react-icons/si";
import { FaHands } from "react-icons/fa";

export const categories = [
  {
    label: "게임 프로젝트",
    path: "게임",
    icon: SiDuckduckgo,
    description: "게임프로젝트 입니다.",
    value: 1,
  },
  {
    label: "여행 프로젝트",
    path: "여행",
    icon: SiTourbox,
    description: "여행 프로젝트입니다.",
    value: 2,
  },
  {
    label: "운동 프로젝트",
    path: "운동",
    icon: MdSportsHandball,
    description: "운동 프로젝트입니다.",
    value: 3,
  },
  {
    label: "책 프로젝트",
    path: "책",
    icon: FaBookTanakh,
    description: "책 프로젝트입니다.",
    value: 4,
  },
  {
    label: "직무 프로젝트",
    path: "직무",
    icon: GrWorkshop,
    description: "직무 프로젝트입니다.",
    value: 5,
  },
  {
    label: "언어 프로젝트",
    path: "언어",
    icon: LiaChalkboardTeacherSolid,
    description: "언어 프로젝트입니다.",
    value: 6,
  },
  {
    label: "공연 프로젝트",
    path: "공연",
    icon: SiThemoviedatabase,
    description: "공연 프로젝트입니다.",
    value: 7,
  },
  {
    label: "음악 프로젝트",
    path: "음악",
    icon: SiYoutubemusic,
    description: "음악 프로젝트입니다.",
    value: 8,
  },
  {
    label: "공예 프로젝트",
    path: "공예",
    icon: FaHands,
    description: "공예 프로젝트입니다.",
    value: 9,
  },
  {
    label: "댄스 프로젝트",
    path: "댄스",
    icon: SiBytedance,
    description: "댄스 프로젝트입니다.",
    value: 10,
  },
];

interface CategoriesProps {
  onSelect: (value: number) => void; // onSelect prop의 타입을 명시
}

const Categories: React.FC<CategoriesProps> = ({ onSelect }) => {
  const { category } = useParams();

  return (
    <StCategory>
      {categories.map((item) => (
        <CategoryBox
          key={item.label}
          label={item.label}
          path={item.path}
          icon={item.icon}
          selected={category === item.path}
          value={item.value}
          onSelect={onSelect}
        />
      ))}
    </StCategory>
  );
};

export default Categories;

const StCategory = styled.div`
  display: flex;
  margin: 0 80px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 4px;
  overflow: hidden;
  flex-wrap: wrap;
`;
