import fetch from "node-fetch"

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

export default function() {
  const AlgoliaAppId = process.env.AlgoliaAppId
  const AlgoliaSecreteKey = process.env.AlgoliaSecreteKey

  const headers = {
    'X-Algolia-API-Key': AlgoliaSecreteKey,
    'X-Algolia-Application-Id': AlgoliaAppId
  }

  const getUserRoute = async (req, res, next) => {
    const identity = req.identity

    const userData = await getUserById(identity)

    if (userData.status === 200) {
      setUserData(userData.data, res)
      return
    }

    createUser(req.identity)
    setUserData(makeUserPayload(identity), res)

    next()
  }

  const getUserById = async identity => {
    try {
      const response = await fetch(`https://${AlgoliaAppId}-dsn.algolia.net/1/indexes/users/${identity.id}`, {
        headers
      })

      return successResponseParse(response)
    } catch (error) {
      return errorResponseParse(error)
    }
  }

  const setUserData = (data, res) => {
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(data))
  }

  const makeUserPayload = identity => {
    return {
      name: identity.name,
      email: identity.email,
      image: identity.image,
      homeId: [],
      reviewCount: 0,
      description: '',
      joined: new Date().toISOString()
    }
  }

  const createUser = async identity => {
    try {
      const response = await fetch(`https://${AlgoliaAppId}-dsn.algolia.net/1/indexes/users/${identity.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(makeUserPayload(identity))
      })

      return successResponseParse(response)
    } catch (error) {
      return errorResponseParse(error)
    }
  }

  this.nuxt.hook("render:setupMiddleware", app => app.use("/api/user", getUserRoute))
}
