<template>
  <div>
    <div
      class="app__house__header"
      :style="`background-image: url(${home.images[0]})`"
    />
    <div class="app__house__body">
      <img src="/images/icons/heart.svg" alt="Heart Icon" class="app__fav">
      <h2>{{home.title}}</h2>
      <div class="app__address">
        <span>{{ home.location.address }} {{ home.location.city }} {{ home.location.state }}</span>
      </div>

      <div class="app__amenities">
        <p>{{ $helpers.pluralize(home.guests, 'guest') }}, {{ $helpers.pluralize(home.bedrooms, 'room') }}, {{ $helpers.pluralize(home.beds, 'bed') }}, {{ $helpers.pluralize(home.bathrooms, 'bath') }}</p>
        <p>{{ features }}</p>
      </div>

      <div class="app__flex">
        <div class="app__rating">
          {{ home.reviewValue }} <span>{{ home.reviewCount }}</span>
        </div>
        <div class="app__price">
          ${{ home.pricePerNight }} <span>/ night</span>
        </div>
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
  computed: {
    features() {
      return this.home.features.slice(0, 3).join(", ")
    }
  }
}
</script>
