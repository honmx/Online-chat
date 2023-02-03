export const setCurrentUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
}