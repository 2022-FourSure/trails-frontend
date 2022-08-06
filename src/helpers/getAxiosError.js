const getAxiosError = (err) => {
  const dataError = err?.response?.data?.error || false;
  if (dataError) {
    return dataError
  }
  return err.message
}

export default getAxiosError;