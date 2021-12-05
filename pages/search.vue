<template>
  <div class="app__search__Results__page">

    <div class="app__search__results">
      <div class="app__search__results__listing">
        <h2 class="app__title">Stays in {{ label }}</h2>

        <nuxt-link
            v-for="home in homes"
            :key="home.objectID"
            :to="`/home/${home.objectID}`"
          >
            <HomeRow
              class="app__house"
              :home="home"
              @mouseover.native="highlightMarker(home.objectID, true)"
              @mouseout.native="highlightMarker(home.objectID, false)"
            />
          </nuxt-link>
      </div>
      <div class="app__search__results__map">
        <div class="app__map">
          <Map class="h-100" :location="{ lat, lng }" :markers="getHomeMarkers()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    async beforeRouteUpdate(to, _from, next) {
      const data = await this.$dataApi.getHomesByLocation(to.query.lat, to.query.lng)

      this.homes = data.data.hits
      this.label = to.query.label
      this.lat = to.query.lat
      this.lng = to.query.lng

      next()
    },
    async asyncData({ query, $dataApi }) {
      const data = await $dataApi.getHomesByLocation(query.lat, query.lng)

      return {
        homes: data.data.hits,
        label: query.label,
        lat: query.lat,
        lng: query.lng
      }
    },
    head({ $route }) {
      return {
        title: `Home around ${$route.query.label}`
      }
    },
    methods: {
      highlightMarker(homeId, isHighlighted) {
        document.querySelector(`.home--${homeId}`)?.classList?.toggle("marker__highlight", isHighlighted)
      },
      getHomeMarkers() {
        return this.homes.map(home => ({
          ...home._geoloc,
          pricePerNight: home.pricePerNight,
          id: home.objectID
        }))
      }
    }
  }
</script>
