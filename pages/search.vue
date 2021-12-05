<template>
  <div>
    <pre>{{ $route.query }}</pre>
  </div>
</template>

<script>
  export default {
    head({ $route }) {
      return {
        title: `Searching in ${$route.query.label}`
      }
    }
  }
</script>
