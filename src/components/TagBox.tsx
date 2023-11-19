import { useEffect, useState, useRef } from "react";
import ModifyTag from "./ModifyTag";
import styled from "styled-components";

const TagBoxWrapper = styled.div`
  width: 100%;
  margin-top: 20px;

  border-radius: 3px;
  border: 1px solid var(--gray-200, #e2e8f0);
  background: var(--white, #fff);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
`;

const TagBoxSelected = styled.div`
  width: 100%;
  padding: 10px 10px;
  border-bottom: 1px solid var(--gray-900, #e2e8f0);

  display: flex;
  flex-wrap: wrap;
`;

const TagBoxNotSelected = styled.div`
  width: 100%;
  padding: 10px 10px;

  display: flex;
  flex-wrap: wrap;
`;

const TagBoxTitle = styled.div`
  width: 100%;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  color: #285e61;

  text-transform: uppercase;
  margin-bottom: 10px;
`;

const TagItemWrapper = styled.div`
  width: 100px;
  display: flex;
  flex-wrap: wrap;
`;

const TagItem = (props: any) => {
  return (
    <>
      <ModifyTag tagname={props.name} clickHandlier={props.clickHandlier} />
    </>
  );
};

const TagBox = (props: any) => {
  const tags = [
    "사진",
    "스누핑",
    "풋살",
    "추리",
    "번개",
    "노래",
    "독서",
    "친목",
    "출사",
    "영어회화",
    "세미나",
    "온라인",
    "축구",
    "서울",
    "파티",
    "핫플",
    "연합",
    "방송",
    "밴드",
    "연예",
    "튜터링",
    "불교",
    "기독교",
    "선교",
    "콘텐츠",
    "마케팅",
    "동방",
    "맛집탐방",
    "기획",
    "견학",
    "부스",
    "프로젝트",
    "AI",
    "체육대회",
    "멘토링",
    "향수",
    "술",
    "제작",
    "수련회",
    "감사",
    "블로그",
    "K_POP",
    "스터디",
    "사진전",
    "정기공연",
    "심리학",
    "만화카페",
    "자과캠",
    "덕질",
    "맛집",
    "미디어",
    "서브컬쳐",
    "아이돌",
    "SNS",
    "버스킹",
    "애니메이션",
    "굿즈",
    "당구",
    "채플",
    "경기도",
    "개발",
    "수도권",
    "소모임",
    "부트캠프",
    "악기",
    "보드게임",
    "합주",
    "법회",
    "태권도",
    "모션그래픽",
    "템플스테이",
    "여행",
    "데이터",
    "명륜캠",
    "전화",
    "수학",
    "방탈출",
  ];
  const [selected, setSelected] = useState<string[]>([]);
  const [notSelected, setNotSelected] = useState<string[]>([]);

  const clickHandlier = (name: string) => {
    if (selected?.includes(name)) {
      setSelected(selected?.filter((item) => item !== name));
      setNotSelected([...notSelected, name]);
    } else {
      console.log("??");
      setNotSelected(notSelected?.filter((item) => item !== name));
      setSelected([...selected, name]);
    }
  };

  useEffect(() => {
    setSelected(props.selected);
    setNotSelected(tags.filter((item) => !props.selected?.includes(item)));
  }, []);

  useEffect(() => {
    console.log(selected);
    props.setTag(selected);
  }, [selected]);

  return (
    <TagBoxWrapper>
      <TagBoxSelected>
        <TagBoxTitle>selected</TagBoxTitle>
        {selected?.map((name: string) => (
          <TagItem name={name} clickHandlier={clickHandlier} />
        ))}
      </TagBoxSelected>
      <TagBoxNotSelected>
        {notSelected?.map((name: string) => (
          <TagItem name={name} clickHandlier={clickHandlier} />
        ))}
      </TagBoxNotSelected>
    </TagBoxWrapper>
  );
};

export default TagBox;
