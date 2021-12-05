export default (_, inject) => {
  const successResponseParse = async response => {
    const { ok, status, statusText } = response

    const data = await response.json()

    return {
      error: !ok,
      status,
      statusText,
      data
    }
  }

  const errorResponseParse = _error => {
    return {
      error: true,
      status: 500,
      statusText: "Internal Server Error",
      data: {}
    }
  }

  inject("responseParse", {
    success: response => successResponseParse(response),
    error: error => errorResponseParse(error)
  })
}
