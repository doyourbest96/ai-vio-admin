import { FC } from "react";
import { SignIn } from "@clerk/nextjs";

const LoginPage: FC = () => {
  return <SignIn routing="hash" />;
};

export default LoginPage;
