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

  const getReviewsByHomeId = async homeId => {
    try {
      const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/reviews/query`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          filters: `homeId:${homeId}`,
          hitsPerPage: 6,
          attributesToHighlight: []
        })
      })

      return $responseParse.success(response)
    } catch (error) {
      return $responseParse.error(error)
    }
  }

  const getUserByHomeId = async homeId => {
    try {
      const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/query`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          filters: `homeId:${homeId}`,
          attributesToHighlight: []
        })
      })

      return $responseParse.success(response)
    } catch (error) {
      return $responseParse.error(error)
    }
  }

  const getHomesByLocation = async (lat, lng, radiusInMeters = 1500) => {
    try {
      const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/query`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          aroundLatLng: `${lat}, ${lng}`,
          aroundRadius: radiusInMeters,
          hitsPerPage: 10,
          attributesToHighlight: []
        })
      })

      return $responseParse.success(response)
    } catch (error) {
      return $responseParse.error(error)
    }
  }

  inject("dataApi", {
    getHome,
    getReviewsByHomeId,
    getUserByHomeId,
    getHomesByLocation
  })
}
