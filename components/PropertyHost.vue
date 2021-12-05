<template>
  <div class="app__background__grey">
    <div class="app__wrapper app__padded__vertical">
      <div class="app__host__header">
        <div>
          <img
            :src="user.image"
            :alt="user.name"
          >
          <div>
            <div class="app__host__name">
              {{ user.name }}
            </div>
            <div class="app__host__date">
              Joined in {{ $helpers.formatDate(user.joined) }}
            </div>
            <div class="app__flex">
              <div class="app__host__reviews">
                {{ user.reviewCount }} reviews
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="app__host__description">
        {{ user.description }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    }
  }
</script>
