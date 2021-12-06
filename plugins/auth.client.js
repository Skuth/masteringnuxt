import Cookie from "js-cookie"

export default ({ env, store }, inject) => {
  const initAuth = () => {
    window.gapi.load("auth2", async () => {
      const auth2 = await window.gapi.auth2.init({
        client_id: env.GoogleOAuthClientId
      })

      auth2.currentUser.listen(parseUser)
    })

    window.gapi.signin2.render("googleButton", {
      onsuccess: parseUser
    })
  }

  window.initAuth = initAuth

  const addScript = () => {
    const script = document.createElement("script")
    script.src = `https://apis.google.com/js/platform.js?onload=initAuth`
    script.async = true

    document.head.appendChild(script)
  }

  const parseUser = user => {
    if (!user.isSignedIn()) {
      Cookie.remove(env.GoogleOAuthCookieName)
      store.commit("auth/SET_USER", { user: null })
      return
    }

    const profile = user.getBasicProfile()
    const idToken = user.getAuthResponse().id_token

    Cookie.set(env.GoogleOAuthCookieName, idToken, { expires: 1/24, sameSite: "Lax" })

    store.commit("auth/SET_USER", {
      user: {
        fullName: profile.getName(),
        imageUrl: profile.getImageUrl()
      }
    })
  }

  const signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut()
  }

  addScript()

  inject("auth", {
    signOut
  })
}
