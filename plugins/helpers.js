export default (_context, inject) => {
  const pluralize = (number, singularWord) => {
    const text = `${number} ${singularWord}`

    if (number === 1) return text

    return `${text}s`
  }

  const formatDate = dateStr => {
    const date = new Date(dateStr)

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }

    return date.toLocaleDateString("pt-br", options)
  }

  inject("helpers", {
    pluralize,
    formatDate
  })
}
