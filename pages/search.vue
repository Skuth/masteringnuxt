<template>
  <div class="search">
    <p class="search__title">Results for {{ label }}</p>

    <div class="search__container">
      <div class="search__homes">
        <template v-if="homes.length">
          <nuxt-link
            v-for="home in homes"
            :key="home.objectID"
            :to="`/home/${home.objectID}`"
          >
            <HomeRow
              :home="home"
              @mouseover.native="highlightMarker(home.objectID, true)"
              @mouseout.native="highlightMarker(home.objectID, false)"
            />
          </nuxt-link>
        </template>
        <template v-else>
          <p>No results found</p>
        </template>
      </div>

      <div class="search__map">
        <Map :location="{ lat, lng }" :markers="getHomeMarkers()" />
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
        document.querySelector(`.home-${homeId}`)?.classList?.toggle("marker-highlight", isHighlighted)
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

<style lang="scss" scoped>
.search {
  &__title {
    padding: 10px;
    font-size: 1.25rem;
  }
  &__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 85vh;
  }
  &__homes {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    gap: 20px;
  }
}
</style>
