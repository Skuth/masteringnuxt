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
          <template v-if="isLoggedIn">
            <img src="/images/icons/house.svg" alt="House Icon">
            <div class="name">Host</div>

            <img
              :src="user.imageUrl"
              :alt="user.fullName"
              class="avatar"
            >
          </template>
          <div v-show="!isLoggedIn" id="googleButton" class="ml-8"></div>
        </div>
      </header>
    </div>

    <nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters["auth/user"]
    },
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"]
    }
  },
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
