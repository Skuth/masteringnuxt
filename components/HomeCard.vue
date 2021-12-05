<template>
  <div>
    <img
      :src="home.images[0]"
      :alt="home.title"
      width="200"
    >
    <p>{{home.title}}</p>
    <p>{{ home.location.address }} {{ home.location.city }} {{ home.location.state }}</p>
    <p>{{ home.guest }} gueests</p>
    <p>${{ home.pricePerNight }} / night</p>
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
