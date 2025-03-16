export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("access_token"));
  return token || "";
};
