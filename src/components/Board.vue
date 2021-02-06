<template lang="pug">
  .board-wrapper
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
  methods: {},
  mounted() {
    this.provider.context = this.$refs.canvas.getContext("2d");

    this.$refs.canvas.width = this.$el.clientWidth;
    this.$refs.canvas.height = this.$el.clientHeight;
  }
};
</script>
