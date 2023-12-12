import { Link } from "react-router-dom";

import styles from "./Login.module.scss";
import login from "../../images/login.svg";
import mess from "../../images/message.svg";
import pass from "../../images/password.svg";
import facebook from "../../images/Facebook.svg";
import apple from "../../images/apple.svg";
import google from "../../images/google.svg";

function Login() {
  return (
    <div className={styles.window}>
      <div className={styles.div}>
        <div className={styles.inform}>
          <h1 className={styles.title}>Добро пожаловать 👋</h1>
          <h2 className={styles.subtitle}>Мы рады, что вы вернулись.</h2>
          <form className={styles.form}>
            <label className={styles.email} htmlFor="username">
              <span>Введите имя</span>
              <img className={styles.mess} src={mess} alt="icon" />
              <input
                className={styles.input_email}
                id="username"
                placeholder="Введите email"
                type="email"
              />
            </label>
            <label className={styles.password} htmlFor="password">
              <span>Введите пароль</span>
              <img className={styles.pass} src={pass} alt="icon" />
              <input
                id="password"
                placeholder="Введите пароль"
                type="password"
              />
            </label>
            <button className={styles.signin}>Войти</button>
          </form>
          <Link to={"/register"} className={styles.punkt}>
            Зарегистрировться.
          </Link>
          <div className={styles.icons}>
            <img src={facebook} className={styles.icon} alt="facebook" />
            <img src={apple} className={styles.icon} alt="apple" />
            <img src={google} className={styles.icon} alt="google" />
          </div>
        </div>
        <img className={styles.image} src={login} alt="изображение" />
      </div>
    </div>
  );
}

export default Login;
