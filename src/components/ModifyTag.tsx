import React from "react";
import { Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import { UpDownIcon } from "@chakra-ui/icons";

const colors = ["teal", "red", "green", "gray", "cyan", "yellow", "pink", "purple", "orange", "blue"];

function getRandomColor(name: string) {
  let firstCharUnicode = name.codePointAt(0);
  if (firstCharUnicode === undefined) return colors[0];
  let remainder = firstCharUnicode % 10;
  return colors[remainder];
}

const ModifyTag = (props: any) => {
  return (
    <Tag size="md" key={props.key} variant="solid" colorScheme={getRandomColor(props.tagname)} marginEnd={"10px"}>
      <TagLabel>{props.tagname}</TagLabel>
      <TagRightIcon
        onClick={() => {
          props.clickHandlier(props.tagname);
        }}
        as={UpDownIcon}
      />
    </Tag>
  );
};

export default ModifyTag;
