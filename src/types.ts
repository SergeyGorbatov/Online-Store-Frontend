enum IUserRegistration {
  name = "name",
  surname = "surname",
  email = "email",
  password = "password",
  repeatPassword = "repeatPassword",
  phone = "phone",
  address = "address",
}

export let typeUserRegistration: { [key in IUserRegistration]: string };

enum IUserAuthorization {
  email = "email",
  password = "password",
}

export let typeUserAuthorization: { [key in IUserAuthorization]: string };
