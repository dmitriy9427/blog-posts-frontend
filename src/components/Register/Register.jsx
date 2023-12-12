import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import mess from "../../images/message.svg";
import pass from "../../images/password.svg";
import user from "../../images/user.svg";
import regiser from "../../images/register.svg";

import styles from "./Register.module.scss";

function Register() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "all",
  });

  const onSubmit = (value) => {
    console.log(value);
  };

  return (
    <div className={styles.window}>
      <div className={styles.div}>
        <div className={styles.inform}>
          <h1 className={styles.title}>Добро пожаловать 👋</h1>
          <h2 className={styles.subtitle}>Мы рады, что вы вернулись.</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <label htmlFor="name">
              <span>Введите имя</span>
              <img className={styles.user} src={user} alt="icon" />
              <input
                id="name"
                placeholder="Введите имя"
                type="text"
                {...register("username", {
                  required: "Введите имя",
                  minLength: {
                    value: 3,
                    message: "Имя должно содержать не менее 3 симовлов",
                  },
                })}
              />
              <span className={styles.errors}>{errors.username?.message}</span>
            </label>
            <label className={styles.email} htmlFor="useremail">
              <span>Введите email</span>
              <img className={styles.mess} src={mess} alt="icon" />
              <input
                className={styles.input_email}
                id="useremail"
                placeholder="Введите email"
                type="email"
                {...register("email", {
                  required: "Введите email",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Проверьте правильность введенной почты",
                  },
                })}
              />
              <span className={styles.errors}>{errors.email?.message}</span>
            </label>
            <label className={styles.password} htmlFor="password">
              <span>Введите пароль</span>
              <img className={styles.pass} src={pass} alt="icon" />
              <input
                id="password"
                placeholder="Введите пароль"
                type="password"
                {...register("password", {
                  required: "Укажите пароль.",
                  minLength: {
                    value: 4,
                    message: "Длина пароля не менее 4 символов",
                  },
                })}
              />
              <span className={styles.errors}>{errors.password?.message}</span>
            </label>
            <button
              style={{ marginTop: `${errors ? "45px" : "65px"}` }}
              type="submit"
              className={styles.signin}
            >
              Зарегистрировться
            </button>
          </form>
          <p className={styles.punkt}>
            Уже зарегистрированы?
            <Link className={styles.link} to={"/login"}>
              Войти.
            </Link>
          </p>
        </div>
        <img className={styles.image} src={regiser} alt="изображение" />
      </div>
    </div>
  );
}

export default Register;
