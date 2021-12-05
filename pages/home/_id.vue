<template>
  <div class="app__container">
    <PropertyGallery :images="home.images" />
    <PropertyDetails :home="home" />
    <PropertyDescription :home="home" />
    <PropertyMap :home="home" />
    <PropertyReviews :reviews="reviews" />
    <PropertyHost :user="user" />
  </div>
</template>

<script>
  export default {
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
