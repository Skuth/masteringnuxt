<template>
  <div class="home">
    <div class="home__images">
      <img
        v-for="(image, index) in home.images"
        :key="image"
        :src="image"
        :alt="`${home.title} image ${index + 1}`"
        width="200"
        height="150"
      >
    </div>
    <h1>{{ home.title }}</h1>
    <p>${{ home.pricePerNight }} / night</p>
    <div>
      <img src="/images/marker.svg" alt="Marker" width="20" height="20">
      <span>{{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }}</span>
    </div>
    <div>
      <img src="/images/star.svg" alt="Marker" width="20" height="20">
      <span>{{ home.reviewValue }}</span>
    </div>
    <p>{{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bath</p>

    <Map :location="home._geoloc" />
  </div>
</template>

<script>
  export default {
    async asyncData({ route, $dataApi }) {
      const home = await $dataApi.getHome(route.params.id)

      return {
        home
      }
    },
    head() {
      return {
        title: this.home.title
      }
    },
  }
</script>

<style lang="scss" scoped>
.home {
  &__images {
    display: flex;
  }
}
</style>
