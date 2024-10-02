export type SignupFormInputs = {
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  address: string;
  role?: "user" | "admin";
};
