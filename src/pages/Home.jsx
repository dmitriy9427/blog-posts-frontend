import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.autch.data);

  const isPostStatus = posts.status === "Загрузка ...";
  const isTagsStatus = tags.status === "Загрузка ...";

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab style={{ color: "white" }} label="Новые" />
        <Tab style={{ color: "white" }} label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostStatus ? [...Array(5)] : posts?.items).map((obj, index) =>
            isPostStatus ? (
              <Post isLoading={true} key={index} />
            ) : (
              <Post
                id={obj._id}
                title={obj?.title}
                imageUrl={
                  obj.imageUrl ? `http://localhost:8888${obj.imageUrl}` : ""
                }
                user={obj?.user}
                createdAt={obj?.user?.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj?.tags}
                isEditable={userData?._id === obj?.user._id}
                isLoading={false}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsStatus} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
