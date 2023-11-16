import { useEffect, useState } from "react";
import ProfileTag from "./profileTag";
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
    <TagItemWrapper
      onClick={() => {
        console.log("?");
        props.clickHandlier(props.name);
      }}
    >
      <ProfileTag
        tagname={props.name}
        onClick={() => {
          console.log("?");
          props.clickHandlier(props.name);
        }}
      />
    </TagItemWrapper>
  );
};

const TagBox = (props: any) => {
  const tags = ["친목", "비즈니스", "학술", "음악", "애니메이션", "영상", "독서", "영어회화", "종교", "사진", "엔터테인먼트", "탐정", "향수", "스포츠", "기획", "제작"];
  const [selected, setSelected] = useState<string[]>([]);
  const [notSelected, setNotSelected] = useState<string[]>([]);

  const clickHandlier = (name: string) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((item) => item !== name));
      setNotSelected([...notSelected, name]);
    } else {
      setNotSelected(notSelected.filter((item) => item !== name));
      setSelected([...selected, name]);
    }
    console.log("ss");
  };

  useEffect(() => {
    setSelected(props.selected);
    setNotSelected(tags.filter((item) => !props.selected.includes(item)));
  }, [props.selected]);

  return (
    <TagBoxWrapper>
      <TagBoxSelected>
        <TagBoxTitle>selected</TagBoxTitle>
        {selected.map((name: string) => (
          <TagItem name={name} clickHandlier={clickHandlier} />
        ))}
      </TagBoxSelected>
      <TagBoxNotSelected>
        {notSelected.map((name: string) => (
          <TagItem name={name} clickHandlier={clickHandlier} />
        ))}
      </TagBoxNotSelected>
    </TagBoxWrapper>
  );
};

export default TagBox;
