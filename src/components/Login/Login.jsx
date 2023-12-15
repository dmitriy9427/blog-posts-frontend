import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { fetchLogin } from "../../redux/slices/autch";

import styles from "./Login.module.scss";
import login from "../../images/login.svg";
import mess from "../../images/message.svg";
import pass from "../../images/password.svg";
import facebook from "../../images/Facebook.svg";
import apple from "../../images/apple.svg";
import google from "../../images/google.svg";

function Login() {
  const dispatch = useDispatch();
  // const autchStatus = useSelector(autchSelector);
  const navigate = useNavigate();
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      email: "dimaryabov@mail.ru",
      passwordHash: "1234ddd",
    },
    mode: "onChange",
  });

  console.log(setError);

  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values));
    if (!data.payload) {
      return alert("Не удалось авторизоваться!");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      navigate("/");
    }
  };

  return (
    <div className={styles.window}>
      <div className={styles.div}>
        <div className={styles.inform}>
          <h1 className={styles.title}>Добро пожаловать 👋</h1>
          <h2 className={styles.subtitle}>Мы рады, что вы вернулись.</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <label className={styles.email} htmlFor="email">
              <span>Введите имя</span>
              <img className={styles.mess} src={mess} alt="icon" />
              <input
                className={styles.input_email}
                id="email"
                placeholder="Введите email"
                type="email"
                {...register("email", {
                  required: "Укажите почту.",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Проверьте правильность почты",
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
                {...register("passwordHash", {
                  required: "Укажите пароль.",
                  minLength: {
                    value: 4,
                    message: "Длина пароля не менее 4 символов",
                  },
                })}
              />
              <span className={styles.errors}>
                {errors.passwordHash?.message}
              </span>
            </label>
            <button
              disabled={isValid ? false : true}
              type="submit"
              className={styles.signin}
            >
              Войти
            </button>
          </form>
          <span>{}</span>
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
