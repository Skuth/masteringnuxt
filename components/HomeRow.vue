<template>
  <div class="home">
    <img
      :src="home.images[0]"
      :alt="home.title"
      width="200"
    >
    <div class="home__content">
      <p>{{home.title}}</p>
      <p>{{ home.location.address }} {{ home.location.city }} {{ home.location.state }}</p>
      <p>{{ $helpers.pluralize(home.guests, 'guest') }}, {{ $helpers.pluralize(home.bedrooms, 'room') }}, {{ $helpers.pluralize(home.beds, 'bed') }}, {{ $helpers.pluralize(home.bathrooms, 'bath') }}</p>
      <p>${{ home.pricePerNight }} / night</p>

      <div>
        <img src="/images/star.svg" alt="Marker" width="20" height="20">
        <span>{{ home.reviewValue }} - {{ home.reviewCount }}</span>
      </div>
    </div>
    </div>
</template>

<script>

export default {
  props: {
    home: {
      type: Object,
      required: true
    }
  },
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: row;
  align-items: center;
  &__content {
    margin-left: 20px;
  }
}
</style>
