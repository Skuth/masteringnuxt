export default ({ env }, inject) => {
  const appId = env.AlgoliaAppId
  const apikey = env.AlgoliaApiKey

  const getHome = async homeId => {
    const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
      headers: {
        'X-Algolia-API-Key': apikey,
        'X-Algolia-Application-Id': appId
      }
    })
      .then(res => res.json())
      .catch(err => { throw err })

    return response
  }

  inject("dataApi", {
    getHome
  })
}
