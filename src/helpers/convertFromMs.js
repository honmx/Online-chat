const convertFromMs = (ms) => {
  return new Date(ms).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export { convertFromMs };