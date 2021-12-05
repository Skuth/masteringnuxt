<template>
  <div class="app__background-grey">
    <div class="app__wrapper">
      <div class="app__double__column">
        <div class="app__padded__vertical">
          <h2 class="app__subtitle">Description</h2>
          <div class="app__description">
            {{ home.description }}
          </div>
        </div>
        <div class="app__padded__vertical">
          <div
            v-for="(feature, index) in home.features"
            :key="index"
            class="app__tag"
          >
            {{ feature }}
          </div>
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
    }
  }
</script>
