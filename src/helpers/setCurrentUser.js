export const setCurrentUser = (user) => {
  // debugger;
  localStorage.setItem("user", JSON.stringify(user));
}