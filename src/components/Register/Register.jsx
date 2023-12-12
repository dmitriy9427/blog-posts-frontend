import { Link } from "react-router-dom";

import mess from "../../images/message.svg";
import pass from "../../images/password.svg";
import user from "../../images/user.svg";
import register from "../../images/register.svg";

import styles from "./Register.module.scss";

function Register() {
  return (
    <div className={styles.window}>
      <div className={styles.div}>
        <div className={styles.inform}>
          <h1 className={styles.title}>Добро пожаловать 👋</h1>
          <h2 className={styles.subtitle}>Мы рады, что вы вернулись.</h2>
          <form className={styles.form}>
            <label htmlFor="name">
              <span>Введите имя</span>
              <img className={styles.user} src={user} alt="icon" />
              <input id="name" placeholder="Введите имя" type="text" />
            </label>
            <label className={styles.email} htmlFor="useremail">
              <span>Введите email</span>
              <img className={styles.mess} src={mess} alt="icon" />
              <input
                className={styles.input_email}
                id="useremail"
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
            <button className={styles.signin}>Зарегистрировться</button>
          </form>
          <p className={styles.punkt}>
            Уже зарегистрированы?
            <Link className={styles.link} to={"/login"}>
              Войти.
            </Link>
          </p>
        </div>
        <img className={styles.image} src={register} alt="изображение" />
      </div>
    </div>
  );
}

export default Register;
