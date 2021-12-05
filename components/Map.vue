<template>
  <div ref="map" class="map"></div>
</template>

<script>
  export default {
    props: {
      location: {
        type: Object,
        required: true
      }
    },
    mounted() {
      this.$maps.showMap(this.$refs.map, this.location)
    }
  }
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 800px;
}
</style>
