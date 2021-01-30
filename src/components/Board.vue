<template lang="pug">
  .board-wrapper
    canvas(ref="board")
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
  mounted() {
    this.provider.context = this.$refs.board.getContext("2d");

    this.$refs.board.width = this.$el.clientWidth;
    this.$refs.board.height = this.$el.clientHeight;
  }
};
</script>
