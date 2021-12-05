<template>
  <div class="short__text">
    <p>{{ displayText }}</p>
    <button v-if="isTooLong && !isExpanded" class="link" @click="isExpanded = true">Read more</button>
    <button v-if="isTooLong && isExpanded" class="link" @click="isExpanded = false">Read less</button>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        required: true
      },
      target: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        isExpanded: false,
        chunks: []
      }
    },
    computed: {
      isTooLong() {
        return this.chunks.length === 2
      },
      displayText() {
        if (!this.isTooLong || this.isExpanded) return this.chunks.join(" ")

        return `${this.chunks[0]}...`
      }
    },
    created() {
      this.chunks = this.getChunks()
    },
    methods: {
      getChunks() {
        const position = this.text.indexOf(" ", this.target)

        if (this.text.length <= this.target || position === -1) return [this.text]

        return [this.text.substr(0, position), this.text.substr(position)]
      }
    }
  }
</script>

<style lang="scss" scoped>
.short__text {
  .link {
    background: transparent;
    color: #5865f2;
    cursor: pointer;
    font-size: 0.875rem;
    &:focus {
      border: none;
      outline: none;
    }
  }
}
</style>
