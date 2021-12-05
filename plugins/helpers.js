export default (_context, inject) => {
  const pluralize = (number, singularWord) => {
    const text = `${number} ${singularWord}`

    if (number === 1) return text

    return `${text}s`
  }

  inject("helpers", {
    pluralize
  })
}
