export default ({ env }, inject) => {
  let isLoaded = false
  let waiting = []

  const initGoogleMaps = () => {
    isLoaded = true

    waiting.forEach(item => {
      if (typeof item.fn === "function") {
        item.fn(...item.arguments)
      }
    })

    waiting = []
  }

  const addScript = () => {
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${env.GoogleApiKey}&libraries=places&callback=initGoogleMaps`
    script.async = true

    window.initGoogleMaps = initGoogleMaps
    document.head.appendChild(script)
  }

  const showMap = (...args) => {
    if (!isLoaded) {
      waiting.push({
        fn: showMap,
        arguments: args
      })

      return
    }

    const [ canvas, location ] = args

    const { lat, lng } = location

    const position = new window.google.maps.LatLng(lat, lng)

    const mapOptions = {
      zoom: 18,
      center: position,
      disableDefaultUi: true,
      zoomControl: true
    }

    const map = new window.google.maps.Map(canvas, mapOptions)
    const marker = new window.google.maps.Marker({
      position
    })

    marker.setMap(map)
  }

  const makeAutoComplete = (...args) => {
    if (!isLoaded) {
      waiting.push({
        fn: makeAutoComplete,
        arguments: args
      })

      return
    }

    const [ input ] = args

    const autoCompleteOptions = {
      types: [ "(cities)" ]
    }

    const autoComplete = new window.google.maps.places.Autocomplete(input, autoCompleteOptions)
    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace()
      input.dispatchEvent(new CustomEvent('changed', { detail: place }))
    })
  }

  addScript()

  inject("maps", {
    showMap,
    makeAutoComplete
  })
}
