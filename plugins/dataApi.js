export default ({ env, $responseParse }, inject) => {
  const appId = env.AlgoliaAppId
  const apikey = env.AlgoliaApiKey

  const headers = {
    'X-Algolia-API-Key': apikey,
    'X-Algolia-Application-Id': appId
  }

  const getHome = async homeId => {
    try {
      const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers })

      return $responseParse.success(response)
    } catch (error) {
      return $responseParse.error(error)
    }
  }

  inject("dataApi", {
    getHome
  })
}
