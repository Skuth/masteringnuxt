<template>
  <div>
    <header class="template__header">
      <nuxt-link to="/">
        <span>Home</span>
        <input
          ref="citySearch"
          type="search"
          class="search__city__input"
          placeholder="Cidade"
          @changed="searchChanged"
        >
      </nuxt-link>
    </header>

    <nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$maps.makeAutoComplete(this.$refs.citySearch)
  },
  methods: {
    searchChanged(event) {
      const place = event.detail

      if (!place.geometry) return

      this.$router.push({
        name: "search",
        query: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          label: place.formatted_address
        },
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.template__header {
  padding: 10px;
  .search__city__input {
    padding: 5px 15px;
    border: 1px solid #e9e9e9;
    margin-left: 10px;
    border-radius: 14px;
  }
}
</style>
