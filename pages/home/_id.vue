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

    <div>
      <img
        :src="user.image"
        :alt="user.name"
      >
      <span>{{ user.name }}</span>
      <p>{{ user.joined | formatDate }}</p>
      <p>{{ user.reviewCount }}</p>
      <p>{{ user.description }}</p>
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
      const responses = await Promise.all([
        $dataApi.getHome(route.params.id),
        $dataApi.getReviewsByHomeId(route.params.id),
        $dataApi.getUserByHomeId(route.params.id)
      ])

      const badResponse = responses.find(response => response.error)

      if (badResponse) return error({ statusCode: badResponse.status, message: badResponse.statusText })

      return {
        home: responses[0].data,
        reviews: responses[1].data.hits,
        user: responses[2].data.hits[0]
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
