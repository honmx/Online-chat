const convertToMs = (date) => {
  return (date.seconds + date.nanoseconds / 1000000000) * 1000
}

export { convertToMs };