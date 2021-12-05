<template>
  <div class="app__wrapper app__padded__vertical">
    <h2 class="app__subtitle">Location</h2>
    <p class="app__description">
      {{ home.location.address }}
      {{ home.location.city }}
      {{ home.location.state }}
      {{ home.location.country }}
    </p>
    <div class="app__map">
      <Map class="h-100" :location="home._geoloc" />
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
    }
  }
</script>
