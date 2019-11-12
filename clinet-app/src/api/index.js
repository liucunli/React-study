import ajax from "./ajax";

export const reqRegister = (user) => {ajax('/register','POST',user)};

export const reqLogin = (user) => {ajax('/login','POST',user)};