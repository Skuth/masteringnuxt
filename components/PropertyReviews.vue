<template>
  <div class="app__padded__vertical">
    <div class="app__wrapper">
      <div class="app__testimonials">
        <div
          v-for="(review, index) in reviews"
          :key="index"
        >
          <div class="app__testimonial__header">
            <div>
              <img
                :src="review.reviewer.image"
                :alt="review.reviewer.name"
              >
            </div>
            <div>
              <p class="app__testimonial__name">
                {{ review.reviewer.name }}
              </p>
              <p class="app__testimonial__date">
                {{ $helpers.formatDate(review.date) }}
              </p>
            </div>
          </div>
          <div class="app__testimonial__body">
            <ShortText
              :text="review.comment"
              :target="150"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      reviews: {
        type: Array,
        required: true
      }
    }
  }
</script>
