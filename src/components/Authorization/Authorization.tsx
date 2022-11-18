import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Input from "components/Input/Input";
import { logIn } from "store/authenticationSlice";
import { useAppDispatch, useAppSelector } from "hook";
import { schemaAuthorization } from "validations/validationAuthentication";
import logo from "img/logo-apple.png";
import "./style.scss";


const Authorization: FC = () => {
  const dispatch = useAppDispatch();
  const { auth, errorLogin } = useAppSelector((state) => state.authentication, shallowEqual);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaAuthorization),
  });

  const handleAction = (user: any) => {
    dispatch(logIn(user));
  };

  useEffect(() => {
    if (auth && !errorLogin) {
      navigate("/home");
    }
  }, [auth, errorLogin, navigate]);

  return (
    <div className="authorization">
      <img src={logo} alt="Логотип интернет-магазина" className="logo" />
      <header className="title-authorization">Authorization</header>
      <main className="authorization-content">
        <form className="form" onSubmit={handleSubmit(handleAction)}>
          <Input
            placeholder="Email"
            nameInput="email"
            register={register}
            type="email"
            errors={errors}
            id="2001"
          />
          <Input
            placeholder="Password"
            nameInput="password"
            register={register}
            type="password"
            errors={errors}
            id="2002"
          />
          <div className="form__errors-be">{errorLogin}</div>
          <div className="block-links">
            <a href="/auth/registration" className="form__link">
              Sign Up
            </a>
            <Link to="#" className="form__link">
              Forgot password
            </Link>
          </div>
          <Button variant="contained" type="submit">
            Log In
          </Button>
          <Button
            type="button"
            variant="outlined"
            style={{ marginTop: "10px" }}
            onClick={() => navigate("/home")}
          >
            HOME
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Authorization;
