<template>
  <div>
    <div class="app">
      <header class="app__header">
        <div class="app__logo">
          <nuxt-link to="/">
            <img src="/images/logo.svg" alt="Logo">
          </nuxt-link>
        </div>

        <div class="app__search">
          <input
            ref="citySearch"
            autocomplete="off"
            type="search"
            placeholder="Enter your address"
            @changed="searchChanged"
          >
          <input
            type="text"
            class="datepicker"
            placeholder="Check in"
          >
          <input
            type="text"
            class="datepicker"
            placeholder="Check out"
          >
          <button>
            <img src="/images/icons/search.svg" alt="Search Icon">
          </button>
        </div>

        <div class="app__user__menu">
          <img src="/images/icons/house.svg" alt="House Icon">
          <div class="name">Host</div>
          <img src="/images/user.jpg" alt="User Avatar" class="avatar">
        </div>
      </header>
    </div>

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
