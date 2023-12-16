import React from "react";
import { Link } from "react-router-dom";
import styles from "./TagsBlock.module.scss";
import grid from "../../images/grid.svg";

export const TagsBlock = ({ items }) => {
  return (
    <div className={styles.tagsBlock}>
      <h4 className={styles.h4}>Тэги</h4>
      <ul className={styles.list}>
        {items.map((item, i) => {
          return (
            <Link to={`/tags/${item}`} key={i} className={styles.listItem}>
              <img className={styles.img} src={grid} alt="grid" />
              <span className={styles.span}>{item}</span>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
