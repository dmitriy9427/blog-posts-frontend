import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import axios from "../../axios";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";

export const AddPost = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const refFileImage = useRef(null);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const files = event.target.files[0];
      formData.append("image", files);
      const { data } = await axios.post("/uploads", formData);
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
      alert("Ошибка загрузки файла.");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      const field = {
        title,
        text,
        imageUrl,
        tags,
      };

      const res = isEditing
        ? await axios.patch(`/posts/${id}`, field)
        : await axios.post("/posts", field);

      const postId = isEditing ? id : res.data._id;

      navigate(`/posts/${postId}`);
    } catch (error) {
      console.log(error);
      alert("Ошибка при создании статьи!");
    }
  };
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "500px",
      autofocus: true,
      placeholder: "Напишите описание...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setTags(data.tags.join(", "));
          setImageUrl(data.imageUrl);
        })
        .catch((err) => {
          console.log(err);
          alert("Не удалось получить статью.");
        });
    }
  }, []);

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => refFileImage.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузить превью
      </Button>
      <input
        ref={refFileImage}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:8888${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button
          type="submit"
          onClick={onSubmit}
          size="large"
          variant="contained"
        >
          {isEditing ? "Обновить" : "Опубликовать"}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
