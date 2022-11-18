import * as yup from "yup";

const phoneValidation =
  //eslint-disable-next-line
  /^(\+7)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm;
const emailValidation =
  //eslint-disable-next-line
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

export const schemaRegistration = yup
  .object({
    name: yup.string().min(2).max(50).trim().required(),
    surname: yup.string().min(2).max(50).trim().required(),
    email: yup.string().matches(emailValidation, "Email is not valid"),
    password: yup.string().min(2).max(50).trim().required(),
    repeatPassword: yup.string().oneOf([yup.ref("password"), null]),
    phone: yup.string().matches(phoneValidation, "Phone number is not valid"),
    address: yup.string().min(2).max(100).trim().required(),
  })
  .required();

export const schemaAuthorization = yup
  .object({
    email: yup.string().min(2).required(),
    password: yup.string().min(2).required(),
  })
  .required();
