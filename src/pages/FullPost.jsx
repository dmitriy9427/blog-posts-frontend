import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";

export const FullPost = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Не удалось открыть статью.");
      });
  }, []);

  return (
    <>
      {data ? (
        <Post
          id={data._id}
          title={data.title}
          imageUrl={
            data.imageUrl ? `http://localhost:8888${data.imageUrl}` : ""
          }
          user={data.user}
          createdAt={data.user.createdAt}
          viewsCount={data.viewsCount}
          commentsCount={3}
          tags={data.tags}
        >
          <Markdown children={data.text}></Markdown>
        </Post>
      ) : (
        <Post isLoading={isLoading} isFullPost />
      )}
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={isLoading}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
