import cookie from "cookie"
import { OAuth2Client } from "google-auth-library"

export default function() {
  const GoogleOAuthClientId = process.env.GoogleGoogleOAuthClientId
  const GoogleOAuthCookieName = process.env.GoogleOAuthCookieName

  const handler = async (req, res, next) => {
    const idToken = cookie.parse(req.headers.cookie)[GoogleOAuthCookieName]
    if (!idToken) return rejectHit(res)

    const ticket = await getUser(idToken)
    if (!ticket) return rejectHit(res)

    req.identity = {
      id: ticket.sub,
      email: ticket.email,
      name: ticket.name,
      image: ticket.picture
    }

    next()
  }

  const getUser = async idToken => {
    const client = new OAuth2Client(GoogleOAuthClientId)

    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: GoogleOAuthClientId
      })

      return ticket.getPayload()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  const rejectHit = res => {
    res.statusCode = 401
    res.end()
  }

  this.nuxt.hook("render:setupMiddleware", app => app.use("/api", handler))
}
