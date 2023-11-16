import React from "react";
import { Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import { UpDownIcon } from "@chakra-ui/icons";

const colors = ["teal", "red", "green", "gray", "cyan", "yellow", "pink", "purple", "orange", "blue"];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

const ModifyTag = (props: any) => {
  return (
    <Tag size="md" key={props.key} variant="solid" colorScheme={getRandomColor()} marginEnd={"10px"}>
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
