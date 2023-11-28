import React from "react";
import { Tag, TagLabel } from "@chakra-ui/react";

const colors = ["teal", "red", "green", "gray", "cyan", "yellow", "pink", "purple", "orange", "blue"];

function getRandomColor(name: string) {
  let firstCharUnicode = name.codePointAt(0);
  if (firstCharUnicode === undefined) return colors[0];
  let remainder = firstCharUnicode % 10;
  return colors[remainder];
}

const ProfileTag = (props: any) => {
  return (
    <Tag size="md" key={props.key} variant="solid" colorScheme={getRandomColor(props.tagname)} marginEnd={"10px"}>
      <TagLabel>{props.tagname}</TagLabel>
    </Tag>
  );
};

export default ProfileTag;
