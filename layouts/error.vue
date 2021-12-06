<template>
  <div class="error">
    <div class="error__content">
      <img src="https://c.tenor.com/2n6jN7TDgOEAAAAM/afraid-dog.gif" alt="Error GIF">
      <h1>Error!</h1>
      <p>{{ error.message }} <span>{{ error.statusCode }}</span></p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      error: {
        type: Object,
        required: true
      }
    },
    head() {
      return {
        title: "I think we got a problem"
      }
    }
  }
</script>

<style lang="scss" scoped>
.error {
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;
  &__content {
    text-align: center;
    img {
      border-radius: 14px;
      margin: 0 auto;
    }
    h1 {
      font-size: 2.5rem;
      margin: 20px 0;
    }
    p {
      font-size: 1.5rem;
      span {
        font-weight: 900;
      }
    }
  }
}
</style>
