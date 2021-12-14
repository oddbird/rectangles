<template>
  <div class="chart-container">
    <svg id="chart" width="100%" height="625px">
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
    <table data-table>
      <colgroup>
        <col data-col="type" />
        <col data-col="base" />
        <col data-col="comparison" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">{{ period_y1 }}</th>
          <th scope="col">{{ period }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cost of Goods</td>
          <td data-cell="numeric">
            {{ formatUSD(inputData.total_cost_of_revenue_y1) }}
          </td>
          <td data-cell="numeric">
            {{ formatUSD(inputData.total_cost_of_revenue) }}
          </td>
        </tr>
        <tr>
          <td>Operating Costs</td>
          <td data-cell="numeric">
            {{ formatUSD(inputData.total_operating_expenses_y1) }}
          </td>
          <td data-cell="numeric">
            {{ formatUSD(inputData.total_operating_expenses) }}
          </td>
        </tr>
        <tr>
          <td>Operating Income</td>
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
      return 10;
    },
    Y0() {
      return 10;
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
    W_delta() {
      return this.inputData.total_revenue / this.inputData.total_revenue_y1 - 1;
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
.chart-container {
  display: grid;
  margin: 0 3rem;
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

[data-table] {
  border-collapse: collapse;
  box-shadow: 3px 5px 3px #0000006c;
  color: var(--text);
  width: 50%;

  th {
    font-weight: bold;
    text-align: right;
  }

  th,
  td {
    border-bottom: thin solid var(--border-color);
    padding: 1rem 0 1rem 1rem;
  }
  td:last-of-type,
  th:last-of-type {
    padding-right: 1rem;
  }
}
thead {
  background: var(--table-background-color);
  font-size: 1.25rem;
  opacity: 1;
}
tbody {
  font-size: 1rem;
}

[data-cell='numeric'] {
  text-align: right;
}
</style>
