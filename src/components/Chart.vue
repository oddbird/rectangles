<template>
  <div>
    <svg id="chart" width="100%" height="400px"></svg>
    <div class="example-scoped">This is styled from scoped styles.</div>
  </div>
</template>

<script>
import snap from "snapsvg";

export default {
  name: "Chart",
  props: {
    inputData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      svg: null,
    };
  },
  watch: {
    inputData: "draw",
  },
  mounted() {
    this.svg = snap("#chart");
    this.draw();
  },
  methods: {
    getData() {
      return {
        X0: 0,
        Y0: 0,
        W: 300,
        H: 200,
        rev_0: this.inputData.total_revenue_y1,
        rev_1: this.inputData.total_revenue,
        cogs_0: this.inputData.total_cost_of_revenue_y1,
        cogs_1: this.inputData.total_cost_of_revenue,
        sga_0: this.inputData.total_operating_expenses_y1,
        sga_1: this.inputData.total_operating_expenses,
      };
    },
    draw() {
      this.svg.clear();
      const {
        X0,
        Y0,
        W,
        H,
        rev_0,
        rev_1,
        cogs_0,
        cogs_1,
        sga_0,
        sga_1,
      } = this.getData();
      const rev_delta = rev_1 - rev_0;
      const cogs_delta = cogs_1 - cogs_0;
      const sga_delta = sga_1 - sga_0;

      const cogs_pct_0 = cogs_0 / rev_0;
      const sga_pct_0 = sga_0 / rev_0;

      const cogs_pct_delta = cogs_delta / rev_delta;
      const sga_pct_delta = sga_delta / rev_delta;

      const h_cogs_0 = H * cogs_pct_0;
      const h_sga_0 = H * sga_pct_0;

      const h_cogs_delta = H * cogs_pct_delta;
      const h_sga_delta = H * sga_pct_delta;

      const W_delta = rev_1 / rev_0 - 1;

      const rev_color = {
        fill: "#228D57",
        strokeWidth: "5px",
        stroke: "black",
      };
      this.svg.rect(X0, Y0, W, H).attr(rev_color);
      this.svg.rect(X0 + W, Y0, W * W_delta, H).attr(rev_color);

      const cogs_color = {
        fill: "#8c2222",
        strokeWidth: "5px",
        stroke: "black",
      };
      this.svg.rect(X0, Y0, X0 + W, h_cogs_0).attr(cogs_color);
      this.svg
        .rect(X0 + W, Y0, X0 + W * W_delta, h_cogs_delta)
        .attr(cogs_color);

      const sga_color = {
        fill: "#c69595",
        strokeWidth: "5px",
        stroke: "black",
      };
      this.svg.rect(X0, Y0 + h_cogs_0, X0 + W, h_sga_0).attr(sga_color);
      this.svg
        .rect(X0 + W, Y0 + h_cogs_delta, X0 + W * W_delta, h_sga_delta)
        .attr(sga_color);
    },
  },
};
</script>

<style lang="scss" scoped>
.example-scoped {
  color: blue;
}
</style>
