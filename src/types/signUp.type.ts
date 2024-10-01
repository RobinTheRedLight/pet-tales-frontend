export type SignupFormInputs = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role?: "user" | "admin";
};
