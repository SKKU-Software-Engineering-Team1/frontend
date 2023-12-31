import React, { useState, useEffect } from "react";
import NavigationBar from "../components/navigationBar";
import styled from "styled-components";
import { Input, InputGroup, InputRightAddon, Select, Grid } from "@chakra-ui/react";
import searchIcon from "../assets/searchicon.svg";
import ArticleCard from "../components/articleCard";
import axios from "axios";

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [showArticles, setShowArticles] = useState([]);

  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");

  const getArticles = () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const accessToken = localStorage.getItem("accessToken") || "defaultAccessToken";
    const refToken = localStorage.getItem("refreshToken") || "defaultrefToken";

    axios
      .get(`${serverUrl}getArticle`)
      .then((response) => {
        const data = response.data.data;
        setArticles(data);
        setShowArticles(data);

        const tagList = new Set<string>();
        data.forEach((d: any) => {
          tagList.add(d.unionCategory);
        });
        setTags(Array.from(tagList));
      })
      .catch((error) => {
        alert("유저 정보를 불러오는데 실패했습니다." + error);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const handleTagChange = (e: any) => {
    const tag = e.target.value;
    setSelectedTag(tag);
    if (tag === "") {
      setShowArticles(articles);
    } else {
      setShowArticles(articles.filter((article: any) => article.unionCategory === tag));
    }
  };
  // useEffect(() => {
  //   for (let i = 0; i < 8; i++){
  //     articles.push({"image": "Image needs to be changed", "name": "성균관대학교 동아리"})
  //   }
  // }, []);
  // console.log(articles);
  return (
    <div>
      <NavigationBar />
      <TitleWrapper>
        <TitleText>Article</TitleText>
        <InputWrapper>
          <InputGroup size="sm" width={"270px"}>
            <Input placeholder="동아리를 검색해 보세요" />
            <InputRightAddon children={""} />
          </InputGroup>
        </InputWrapper>
      </TitleWrapper>
      <SelectWrapper>
        <Select placeholder="CATEGORY" size="sm" width={"120px"} marginEnd={"15px"} onChange={handleTagChange}>
          {tags.map((tag: string) => (
            <option value={tag}>{tag}</option>
          ))}
        </Select>
        <Select placeholder="All View" width={"120px"} size="sm">
          <option value="option1">이름순</option>
          <option value="option2">이름역순</option>
        </Select>
        <SortTextWrapper>
          <SortText>최신순</SortText>
          <SortText>|</SortText>
          <SortText>마감순</SortText>
        </SortTextWrapper>
      </SelectWrapper>
      <Grid templateColumns="repeat(4, 1fr)" gap={10} paddingLeft={"100px"} paddingRight={"100px"}>
        {showArticles.map((article: any, i: number) => (
          <ArticleCard image={"Image needs to be changed"} id={article.unions_id} name={article.unionName} category={article.unionCategory} />
        ))}
      </Grid>
    </div>
  );
};

export default Article;

const TitleWrapper = styled.div`
  display: flex;
  width: 95%;
  border-bottom: 1px solid #234e52;
  margin-left: 2.5%;
  margin-right: 2.5%;
`;

const TitleText = styled.div`
  font-size: 40px;
  margin-top: 40px;
  margin-bottom: 10px;
  margin-right: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  color: #285e61;
`;

const InputWrapper = styled.div`
  margin-top: auto;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: 0px;
`;

const SelectWrapper = styled.div`
  display: flex;
  margin-left: 2.5%;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const SortText = styled.div`
  color: #285e61;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-left: 10px;
`;

const SortTextWrapper = styled.div`
  margin-left: auto;
  margin-right: 2.5%;
  display: flex;
`;
