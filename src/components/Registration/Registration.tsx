import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Input from "components/Input/Input";
import { addNewUser } from "store/authenticationSlice";
import { schemaRegistration } from "validations/validationAuthentication";
import { useAppDispatch, useAppSelector } from "hook";
import logo from "img/logo-apple.png";
import "./style.scss";

const Registration: FC = () => {
  const dispatch = useAppDispatch();
  const { auth, errorRegistration } = useAppSelector(
    (state) => state.authentication,
    shallowEqual
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRegistration),
  });

  const handleAction = (user: any) => {
    dispatch(addNewUser(user));
  };

  useEffect(() => {
    if (auth && !errorRegistration) {
      navigate("/home");
    }
  }, [auth, errorRegistration, navigate]);

  return (
    <div className="registration">
      <img src={logo} alt="Online store logo" className="logo" />
      <header className="title-registration">Registration</header>
      <main className="registration-content">
        <form className="form" onSubmit={handleSubmit(handleAction)}>
          <div className="form__separation">
            <Input
              placeholder="First name"
              nameInput="name"
              register={register}
              type="text"
              id="1001"
              errors={errors}
            />
            <Input
              placeholder="Last name"
              nameInput="surname"
              register={register}
              type="text"
              id="1002"
              errors={errors}
            />
            <Input
              placeholder="Address"
              nameInput="address"
              register={register}
              type="text"
              id="1003"
              errors={errors}
            />
          </div>
          <div className="form__separation">
            <Input
              placeholder="Email"
              nameInput="email"
              register={register}
              type="email"
              id="1004"
              errors={errors}
            />
            <Input
              placeholder="Phone number"
              nameInput="phone"
              register={register}
              type="text"
              id="1005"
              errors={errors}
            />
            <div className="form__errors-be">{errorRegistration}</div>
          </div>
          <div className="form__separation">
            <Input
              placeholder="Password"
              nameInput="password"
              register={register}
              type="password"
              id="1006"
              errors={errors}
            />
            <Input
              placeholder="Confirm password"
              nameInput="repeatPassword"
              register={register}
              type="password"
              id="1007"
              errors={errors}
            />
          </div>
          <FormControlLabel
            control={<Checkbox required={true} />}
            label="Consent to personal data processing"
            className="form__checkbox"
          />
          <a href="/auth/login" className="form__link">
            Sign In
          </a>
          <Button variant="contained" type="submit">
            Continue
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

export default Registration;
