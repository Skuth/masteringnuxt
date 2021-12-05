<template>
  <div class="search">
    <template v-if="homes.length">
      <HomeRow
        v-for="home in homes"
        :key="home.objectID"
        :home="home"
      />
    </template>
    <template v-else>
      <p>No results found</p>
    </template>
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
    }
  }
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
