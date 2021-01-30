<template lang="pug">
  v-app
    //- v-navigation-drawer(app)
    v-app-bar(app primary)
      v-app-bar-nav-icon
      v-toolbar-title Dampfross Map Editor
    v-main
      v-container
        board(style="width:100%; height:500px")
          hexagon(
            v-for="hex, index of hexagons"
            :x="getX(index)"
            :y="getY(index)"
            :radius="radius"
            :color="hex.color")
</template>

<script>
import Board from "./components/Board";
import Hexagon from "./components/Hexagon";

export default {
  name: "App",
  components: { Board, Hexagon },
  data() {
    return {
      width: 512,
      height: 500,
      radius: 256,
      columns: 2,
      rows: 2,
      hexagons: [{ color: "#ff000066" }]
    };
  },
  methods: {
    getX(index) {
      return (
        (index % this.columns) * this.radius * 2 * 3 / 4 + index * Math.floor(360 / this.columns * this.rows)
      );
    },
    getY(index) {
      return Math.floor(index / this.columns) * this.radius * Math.sqrt(3) / 2;
    }
  },
  mounted() {
    let hexagons = [];
    for (let i = 0; i < this.columns * this.rows; i++) {
      hexagons.push({
        color: `hsl(${i *
          Math.floor(360 / (this.columns * this.rows))}, 60%, 60%)`
      });
    }

    this.hexagons = hexagons;
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
