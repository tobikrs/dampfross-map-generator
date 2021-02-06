<script>
export default {
  inject: ["provider"],
  props: {
    hex: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      default: "#ff0000"
    }
  },
  computed: {
    corners() {
      return this.$root.grid.cornersOfHex(this.hex);
    },
    center() {
      return this.$root.grid.centerOfHex(this.hex);
    }
  },
  render(h) {
    // The context from parent canvas component may not be injected by the time this render function runs for the first time.
    if (!this.provider.context) return;

    const ctx = this.provider.context;

    // draw new shape
    ctx.beginPath();
    ctx.moveTo(this.corners[0].x, this.corners[0].y);
    for (let i = 1; i < this.corners.length; i++) {
      ctx.lineTo(this.corners[i].x, this.corners[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.textAlign = "center";

    // draw coord
    ctx.font = "20px sans-serif";
    ctx.fillText(
      `${this.hex.q},${this.hex.r},${this.hex.s}`,
      this.center.x,
      this.center.y
    );

    return h();
  }
};
</script>
