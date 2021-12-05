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

    <div
      v-for="review in reviews"
      :key="review.objectID"
    >
      <img
        :src="review.reviewer.image"
        :alt="review.reviewer.name"
      >
      <span>{{ review.reviewer.name }}</span>
      <p>{{ review.date | formatDate }}</p>
      <ShortText
        :text="review.comment"
        :target="150"
      />
    </div>
  </div>
</template>

<script>
  export default {
    filters: {
      formatDate(dateStr) {
        const date = new Date(dateStr)

        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        }

        return date.toLocaleDateString("pt-br", options)
      }
    },
    async asyncData({ route, $dataApi, error }) {
      const homeResponse = await $dataApi.getHome(route.params.id)

      if (homeResponse.error) return error({ statusCode: homeResponse.status, message: homeResponse.statusText })

      const reviewResponse = await $dataApi.getReviewsByHomeId(route.params.id)

      if (reviewResponse.error) return error({ statusCode: reviewResponse.status, message: reviewResponse.statusText })

      return {
        home: homeResponse.data,
        reviews: reviewResponse.data.hits
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
