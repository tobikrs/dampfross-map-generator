<template lang="pug">
  v-app
    //- v-navigation-drawer(app)
    v-app-bar(app primary)
      v-app-bar-nav-icon
      v-toolbar-title Dampfross Map Editor
    v-main
      v-container.fill-height(v-resize="onResize" ref="board")
        board(style="width:100%; height:100%; background: #eee" ).fill-height
          hexagon(
            v-for="hex, index of hexagons"
            :key="`hex_${index}`"
            :hex="hex"
            :color="hex.color")
</template>

<script>
import { Grid } from "hexapi";

import Board from "./components/Board";
import Hexagon from "./components/Hexagon";

export default {
  name: "App",
  components: { Board, Hexagon },
  data() {
    return {
      width: 100,
      height: 100,
      ratio: Math.SQRT2,
      columns: 20,
      hexagons: []
    };
  },
  computed: {
    rows() {
      return Math.floor(this.columns / this.ratio);
    },
    hexSize() {
      const size = (this.ratio * this.height) / this.columns;
      return { x: size, y: size };
    }
  },
  methods: {
    onResize() {
      this.width = this.$refs.board.firstChild.clientWidth || this.width;
      this.height = this.$refs.board.firstChild.clientHeight || this.height;
    }
  },
  mounted() {
    this.onResize();
  },
  watch: {
    hexSize: {
      immediate: true,
      handler() {
        const { map } = (this.$root.grid = Grid({
          hexSize: this.hexSize,
          type: "flat",
          rows: this.rows,
          cols: this.columns
        }));

        this.hexagons = map;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
