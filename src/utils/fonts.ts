import { Nunito, Short_Stack } from "next/font/google";

const nunito_init = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["600"],
});

const shortStack_init = Short_Stack({
  subsets: ["latin"],
  variable: "--font-short-stack",
  weight: ["400"],
});

export const nunito = nunito_init.variable;
export const shortStack = shortStack_init.variable;
