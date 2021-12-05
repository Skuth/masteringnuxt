<template>
    <div class="home">
      <div
        v-for="home in homes"
        :key="home.objectID"
      >
        <nuxt-link :to="`/home/${home.objectID}`">
          <home-card :home="home" />
        </nuxt-link>
      </div>
    </div>
</template>

<script>
import homes from "@/data/homes"

export default {
  data() {
    return {
      homes: homes.slice(0, 3)
    }
  },
  head() {
    return {
      title: "Homepage",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Home page from NuxtBnB"
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
}
</style>
