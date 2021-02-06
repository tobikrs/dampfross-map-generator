<template lang="pug">
  v-app
    //- v-navigation-drawer(app)
    v-app-bar(app primary)
      v-app-bar-nav-icon
      v-toolbar-title Dampfross Map Editor
    v-main
      board(style="background: #eee" @grid-resize="onGridResize")
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
      columns: 10,
      hexagons: []
    };
  },
  computed: {
    rows() {
      return Math.floor(this.columns / this.ratio);
    },
    hexSize() {
      const size = this.width / this.ratio / this.rows;
      return { x: size, y: size };
    }
  },
  methods: {
    onGridResize(width, height) {
      this.width = width;
      this.height = height;
    }
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
