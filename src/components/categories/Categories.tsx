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
    path: "game",
    icon: SiDuckduckgo,
    description: "게임프로젝트 입니다.",
  },
  {
    label: "여행 프로젝트",
    path: "tour",
    icon: SiTourbox,
    description: "여행 프로젝트입니다.",
  },
  {
    label: "운동 프로젝트",
    path: "sports",
    icon: MdSportsHandball,
    description: "운동 프로젝트입니다.",
  },
  {
    label: "책 프로젝트",
    path: "book",
    icon: FaBookTanakh,
    description: "책 프로젝트입니다.",
  },
  {
    label: "직무 프로젝트",
    path: "work",
    icon: GrWorkshop,
    description: "직무 프로젝트입니다.",
  },
  {
    label: "언어 프로젝트",
    path: "english",
    icon: LiaChalkboardTeacherSolid,
    description: "언어 프로젝트입니다.",
  },
  {
    label: "공연 프로젝트",
    path: "concert",
    icon: SiThemoviedatabase,
    description: "공연 프로젝트입니다.",
  },
  {
    label: "음악 프로젝트",
    path: "music",
    icon: SiYoutubemusic,
    description: "음악 프로젝트입니다.",
  },
  {
    label: "공예 프로젝트",
    path: "handicraft",
    icon: FaHands,
    description: "공예 프로젝트입니다.",
  },
  {
    label: "댄스 프로젝트",
    path: "dance",
    icon: SiBytedance,
    description: "댄스 프로젝트입니다.",
  },
];

const Categories = () => {
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
