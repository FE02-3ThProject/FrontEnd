import { useParams } from "react-router-dom";
import { TbPool } from "react-icons/tb";
import { SiDuckduckgo } from "react-icons/si";
import { BiSolidShoppingBags } from "react-icons/bi";
import { GiBoatFishing, GiWindmill } from "react-icons/gi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaCar } from "react-icons/fa";
import { TbBuildingEstate } from "react-icons/tb";
import CategoryBox from "./CategoryBox";
import styled from "styled-components";

export const categories = [
  {
    label: "오리게임 만들자",
    path: "duck",
    icon: SiDuckduckgo,
    description: "오리게임프로젝트 입니다.",
  },
  {
    label: "안드로이드개발",
    path: "appliances",
    icon: GiWindmill,
    description: "안드로이드개발 프로젝트입니다.",
  },
  {
    label: "부동산앱개발",
    path: "interior",
    icon: TbBuildingEstate,
    description: "부동산앱개발 프로젝트입니다.",
  },
  {
    label: "쇼핑몰",
    path: "shopping",
    icon: BiSolidShoppingBags,
    description: "쇼핑몰 프로젝트입니다.",
  },
  {
    label: "인테리어 프로젝트",
    path: "men-fashion",
    icon: TbPool,
    description: "인테리어 프로젝트입니다.",
  },
  {
    label: "영어앱 프로젝트",
    path: "english",
    icon: LiaChalkboardTeacherSolid,
    description: "영어앱 프로젝트입니다.",
  },
  {
    label: "여기서만나 프로젝트",
    path: "sports",
    icon: GiBoatFishing,
    description: "여기서만나 프로젝트입니다.",
  },
  {
    label: "자동차 프로젝트",
    path: "car",
    icon: FaCar,
    description: "자동차 프로젝트입니다.",
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 4px;
  overflow: hidden;
`;
