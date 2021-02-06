<template lang="pug">
  .board-wrapper(v-resize="onResize" ref="board")
    canvas(ref="canvas")
    slot
</template>

<script>
export default {
  data() {
    return {
      provider: {
        context: null
      }
    };
  },
  provide() {
    return {
      provider: this.provider
    };
  },
  methods: {
    onResize() {
      const width = this.$refs.board.clientWidth;
      const height = this.$refs.board.clientHeight;
      if (width && height) {
        // resize canavas
        this.$refs.canvas.width = width;
        this.$refs.canvas.height = height;

        this.$emit("grid-resize", width, height);
      }
    }
  },
  mounted() {
    this.provider.context = this.$refs.canvas.getContext("2d");

    this.$refs.canvas.width = this.$refs.board.clientWidth;
    this.$refs.canvas.height = this.$refs.board.clientHeight;
  }
};
</script>
<style scoped>
.board-wrapper {
  display: block;
  height: 100%;
}
</style>
