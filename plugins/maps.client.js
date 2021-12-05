export default ({ env }, inject) => {
  let mapLoaded = false
  let mapWaiting = null

  const initMap = () => {
    mapLoaded = true

    if (mapWaiting) {
      const { canvas, location } = mapWaiting
      renderMap(canvas, location)
      mapWaiting = null
    }
  }

  const addScript = () => {
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${env.GoogleApiKey}&libraries=places&callback=initMap`
    script.async = true

    window.initMap = initMap
    document.head.appendChild(script)
  }

  const showMap = (canvas, location) => {
    if (mapLoaded) renderMap(canvas, location)
    else mapWaiting = { canvas, location }
  }

  const renderMap = (canvas, location) => {
    const position = new window.google.maps.LatLng(location.lat, location.lng)

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

  addScript()

  inject("maps", {
    showMap
  })
}
