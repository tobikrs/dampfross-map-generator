<script>
const sides = 6;

export default {
  inject: ["provider"],
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    radius: {
      type: Number,
      default: 42
    },
    color: {
      type: String,
      default: "#ff0000"
    }
  },
  computed: {
    buildShapePoints() {
      let points = [];
      for (let side = 0; side < sides; side++) {
        const angle = 2 * Math.PI * (side / sides);
        points.push({
          x: this.x + this.radius * Math.cos(angle),
          y: this.y + this.radius * Math.sin(angle)
        });
      }

      return points;
    }
  },
  // eslint-disable-next-line vue/require-render-return
  render() {
    // The context from parent canvas component may not be injected by the time this render function runs for the first time.
    if (!this.provider.context) return;

    const ctx = this.provider.context;
    const shape = this.buildShapePoints;

    // draw new shape
    if (shape.length > 0) {
      ctx.beginPath();
      ctx.moveTo(shape[0].x, shape[0].y);

      for (let i = 1; i < shape.length; i++) {
        ctx.lineTo(shape[i].x, shape[i].y);
      }

      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    // ctx.font = "10px sans-serif";

    // for (let i = 0; i < shape.length; i++) {
    //   ctx.fillText(i + 1, shape[i].x, shape[i].y);
    // }

    // draw coord
    ctx.font = "28px sans-serif";
    ctx.fillText(
      `(${Math.floor(this.x)},${Math.floor(this.y)})`,
      this.x,
      this.y
    );

    this.prevShapePoints = shape;
  }
};
</script>
