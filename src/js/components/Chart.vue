<template>
  <div class="chart-container">
    <span class="revenue-label">Total <strong>Revenue</strong></span>
    <svg
      id="chart"
      data-chart
      xmlns="http://www.w3.org/2000/svg"
      height="auto"
      preserveAspectRatio="xMinYMin"
      :viewBox="`0 0 ${WIDTH + WIDTH * w_delta + 10} ${HEIGHT + 10}`"
    >
      <g>
        <line
          class="revenue-line"
          :y1="Y0"
          :y2="Y0 + HEIGHT * scale"
          x1="0"
          x2="0"
        />
        <rect
          class="cogs"
          :x="X0"
          :y="Y0"
          :width="WIDTH"
          :height="h_cogs_0 * scale"
        />
        <rect
          class="sga"
          :x="X0"
          :y="Y0 + h_cogs_0 * scale"
          :width="WIDTH"
          :height="h_sga_0 * scale"
        />
        <template v-if="HEIGHT > expenses_0">
          <rect
            class="income"
            :x="X0"
            :y="Y0 + expenses_0 * scale"
            :width="WIDTH"
            :height="(HEIGHT - expenses_0) * scale"
          />
          <g
            class="corner bottom-left"
            :transform="`translate(${X0},${Y0 + HEIGHT * scale - 10})`"
          >
            <path d="M0,0V10H10A10,10,0,0,1,0,0Z" />
          </g>
        </template>
        <g class="corner top-left" :transform="`translate(${X0},${Y0})`">
          <path d="M10,0H0V10A10,10,0,0,1,10,0Z" />
        </g>
      </g>
      <g v-if="inputData.total_revenue > inputData.total_revenue_y1">
        <rect
          class="cogs"
          :x="X0 + WIDTH"
          :y="Y0"
          :width="WIDTH * w_delta"
          :height="h_cogs_delta * scale"
        />
        <rect
          class="sga"
          :x="X0 + WIDTH"
          :y="Y0 + h_cogs_delta * scale"
          :width="WIDTH * w_delta"
          :height="h_sga_delta * scale"
        />
        <template v-if="HEIGHT > expenses_delta">
          <rect
            class="income"
            :x="X0 + WIDTH"
            :y="Y0 + expenses_delta * scale"
            :width="WIDTH * w_delta"
            :height="(HEIGHT - expenses_delta) * scale"
          />
          <g
            class="corner bottom-right"
            :transform="`translate(${X0 + WIDTH + WIDTH * w_delta - 10},${
              Y0 + HEIGHT * scale - 10
            })`"
          >
            <path d="M0,10H10V0A10,10,0,0,1,0,10Z" />
          </g>
        </template>
        <g
          class="corner top-right"
          :transform="`translate(${X0 + WIDTH + WIDTH * w_delta - 10},${Y0})`"
        >
          <path d="M0,0A10,10,0,0,1,10,10V0Z" />
        </g>
      </g>
    </svg>
    <table data-table>
      <colgroup>
        <col data-col="type" />
        <col data-col="base" />
        <col data-col="comparison" />
      </colgroup>
      <thead>
        <tr>
          <td></td>
          <th scope="col">{{ period_y1 }}</th>
          <th scope="col">{{ period }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" data-cell="type cogs">Cost of Goods</th>
          <td data-cell="numeric">
            {{ formatUSD(inputData.total_cost_of_revenue_y1) }}
          </td>
          <td data-cell="numeric">
            {{ formatUSD(inputData.total_cost_of_revenue) }}
          </td>
        </tr>
        <tr>
          <th scope="row" data-cell="type sga">Operating Costs</th>
          <td data-cell="numeric">
            {{ formatUSD(inputData.total_operating_expenses_y1) }}
          </td>
          <td data-cell="numeric">
            {{ formatUSD(inputData.total_operating_expenses) }}
          </td>
        </tr>
        <tr>
          <th scope="row" data-cell="type income">Operating Income</th>
          <td data-cell="numeric">
            {{ formatUSD(inputData.operating_income_loss_y1) }}
          </td>
          <td data-cell="numeric">
            {{ formatUSD(inputData.operating_income_loss) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { formatCurrency } from '@/js/utils';

export default {
  name: 'Chart',
  props: {
    inputData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    period() {
      const str = this.inputData.period_id.toString();
      return `${str.substring(0, 4)} Q${str.slice(-1)}`;
    },
    period_y1() {
      const str = this.inputData.period_id.toString();
      const year = (parseInt(str.substring(0, 4), 10) - 1).toString();
      return `${year} Q${str.slice(-1)}`;
    },
    X0() {
      return 5;
    },
    Y0() {
      return 5;
    },
    WIDTH() {
      return 400;
    },
    HEIGHT() {
      return 300;
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
    w_delta() {
      return this.inputData.total_revenue / this.inputData.total_revenue_y1 - 1;
    },
    expenses_0() {
      return this.h_cogs_0 + this.h_sga_0;
    },
    expenses_delta() {
      return this.h_cogs_delta + this.h_sga_delta;
    },
    scale() {
      return (
        this.HEIGHT /
        Math.max(this.expenses_0, this.expenses_delta, this.HEIGHT)
      );
    },
  },
  methods: {
    formatUSD(input) {
      return formatCurrency(input);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../sass/app';

.chart-container {
  display: grid;
  gap: var(--shim);
  grid-template-columns: min-content 1fr;
  margin: var(--double-gutter) var(--gutter);
}

.revenue-label {
  align-self: start;
  color: var(--text);
  grid-column: 1;
  margin-top: var(--shim);
  writing-mode: sideways-lr;

  @supports not (writing-mode: sideways-lr) {
    text-align: right;
    transform: rotate(180deg);
    writing-mode: vertical-rl;
  }
}

.revenue-line {
  stroke: var(--text);
  stroke-width: 3px;
}

[data-chart] {
  grid-column: 2;
  height: auto;
  max-height: 50vh;
  width: 100%;
}

rect {
  stroke: var(--rect-stroke);
  stroke-width: 2px;
}

.income {
  fill: var(--income);
}

.sga {
  fill: var(--sga);
}

.cogs {
  fill: var(--cogs);
}

.corner {
  fill: var(--background);
}

[data-table] {
  border-collapse: collapse;
  border-radius: 4px;
  box-shadow: 1px 3px 6px #00000029;
  color: var(--text);
  font-family: inherit;
  grid-column: 2;
  max-width: 30rem;
  width: 100%;

  th {
    font-size: 0.75rem;
    font-weight: bold;
  }

  th,
  td {
    border-bottom: thin solid var(--border-color);
    padding: var(--gutter);
  }
}

tbody {
  font-size: 0.875rem;
}

[data-cell~='type'] {
  text-align: left;
}

[data-cell~='type']::before {
  background-color: var(--type-color);
  border-radius: 100%;
  content: '';
  display: inline-block;
  height: 14px;
  margin-right: var(--shim);
  width: 14px;
}

[data-cell~='cogs'] {
  --type-color: var(--cogs);
}

[data-cell~='income'] {
  --type-color: var(--income);
}
[data-cell~='sga'] {
  --type-color: var(--sga);
}

[scope='col'],
[data-cell='numeric'] {
  text-align: right;
}
</style>
