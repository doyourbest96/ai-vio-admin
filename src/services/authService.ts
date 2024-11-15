import { api } from "@/utils/api";

const ROUTE_LOGIN = "/login";

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return api.post("/auth2/login", { email, password });
};

export const resetPassword = ({
  password,
  token
}: {
  password: string;
  token: string;
}) => {
  return api.post("/auth2/reset-password", { password, token });
};

interface RegisterModel {
  firstName: string;
  lastName: string;
  companyName?: string;
  companySize?: string;
  email: string;
  password: string;
}

export const requestDemo = (data: { user: RegisterModel; invite?: string }) => {
  const { user, invite } = data;
  let url = `/auth2/register`;
  if (invite) {
    url += `?invite=${invite}`;
  }
  return api.post(url, user);
};

export const saveToken = (token: string) => {
  localStorage.setItem("ai-vio-token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("ai-vio-token");
};

export const saveRememberMe = (token: string) => {
  localStorage.setItem("ai-vio-remember-me", token);
};

export const getRememberMe = (): string | null => {
  return localStorage.getItem("ai-vio-remember-me");
};

export const removeRememberMe = () => {
  localStorage.removeItem("ai-vio-remember-me");
};

export const signOut = () => {
  localStorage.removeItem("ai-vio-token");
  localStorage.removeItem("ai-vio-remember-me");
  window.location.replace(ROUTE_LOGIN);
};

export const sendResetLink = async (props: { email: string }) => {
  const { email } = props;
  const data = { email };
  return await api.post("/auth/reset", data);
};
