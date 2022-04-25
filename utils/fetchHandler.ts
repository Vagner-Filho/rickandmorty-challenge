enum ResponseStatus {
  ErrorCaught = 600,
  ClientError = 450,
  ServerError = 550
}
export const fetchHandler = async (urlToFetchFrom: string) => {
  try {
    const response = await fetch(urlToFetchFrom) // create error handler
    if (response.status !== 200) {
      if (response.status > 399 && response.status < 500) return ResponseStatus.ClientError
      else if (response.status > 499 && response.status < 600) return ResponseStatus.ServerError
      else return response.status
    }
    return await response.json()
  } catch (error) {
    return ResponseStatus.ErrorCaught
  }
}