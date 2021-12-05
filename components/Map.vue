<template>
  <div ref="map" class="map"></div>
</template>

<script>
  export default {
    props: {
      location: {
        type: Object,
        required: true
      },
      markers: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      location: {
        handler() {
          this.updateMap()
        },
        deep: true
      }
    },
    mounted() {
      this.updateMap()
    },
    methods: {
      updateMap() {
        this.$maps.showMap(this.$refs.map, this.location, this.markers)
      }
    }
  }
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
