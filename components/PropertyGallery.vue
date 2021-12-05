<template>
  <div class="app__section">
    <div class="app__wrapper">
      <div class="app__masonry">
        <div
          v-for="image in images"
          :key="image"
          :style="`background-image: url(${image})`"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      images: {
        type: Array,
        required: true
      }
    }
  }
</script>
