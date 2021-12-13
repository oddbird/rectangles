<template>
  <svg id="chart" width="100%" height="500px">
    <g>
      <rect
        class="income"
        :x="X0"
        :y="Y0 + h_cogs_0 + h_sga_0"
        :width="WIDTH"
        :height="HEIGHT - (h_cogs_0 + h_sga_0)"
      />
      <rect
        class="sga"
        :x="X0"
        :y="Y0 + h_cogs_0"
        :width="WIDTH"
        :height="h_sga_0"
      />
      <rect class="cogs" :x="X0" :y="Y0" :width="WIDTH" :height="h_cogs_0" />
    </g>
    <g>
      <rect
        class="income"
        :x="X0 + WIDTH"
        :y="Y0 + h_cogs_delta + h_sga_delta"
        :width="WIDTH * W_delta"
        :height="HEIGHT - (h_cogs_delta + h_sga_delta)"
      />
      <rect
        class="sga"
        :x="X0 + WIDTH"
        :y="Y0 + h_cogs_delta"
        :width="WIDTH * W_delta"
        :height="h_sga_delta"
      />
      <rect
        class="cogs"
        :x="X0 + WIDTH"
        :y="Y0"
        :width="WIDTH * W_delta"
        :height="h_cogs_delta"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: "Chart",
  props: {
    inputData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    X0() {
      return 10;
    },
    Y0() {
      return 10;
    },
    WIDTH() {
      return 300;
    },
    HEIGHT() {
      return 200;
    },
    rev_delta() {
      return this.inputData.total_revenue - this.inputData.total_revenue_y1;
    },
    cogs_delta() {
      return (
        this.inputData.total_cost_of_revenue -
        this.inputData.total_cost_of_revenue_y1
      );
    },
    sga_delta() {
      return (
        this.inputData.total_operating_expenses -
        this.inputData.total_operating_expenses_y1
      );
    },
    cogs_pct_0() {
      return (
        this.inputData.total_cost_of_revenue_y1 /
        this.inputData.total_revenue_y1
      );
    },
    sga_pct_0() {
      return (
        this.inputData.total_operating_expenses_y1 /
        this.inputData.total_revenue_y1
      );
    },
    cogs_pct_delta() {
      return this.cogs_delta / this.rev_delta;
    },
    sga_pct_delta() {
      return this.sga_delta / this.rev_delta;
    },
    h_cogs_0() {
      return this.HEIGHT * this.cogs_pct_0;
    },
    h_sga_0() {
      return this.HEIGHT * this.sga_pct_0;
    },
    h_cogs_delta() {
      return this.HEIGHT * this.cogs_pct_delta;
    },
    h_sga_delta() {
      return this.HEIGHT * this.sga_pct_delta;
    },
    W_delta() {
      return this.inputData.total_revenue / this.inputData.total_revenue_y1 - 1;
    },
  },
};
</script>

<style lang="scss" scoped>
rect {
  stroke: white;
  stroke-width: 2px;
}

.income {
  fill: #358639;
}

.sga {
  fill: #CF4747;
}

.cogs {
  fill: #8B0020;
}
</style>
