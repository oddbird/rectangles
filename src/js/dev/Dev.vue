<template>
  <div id="dev-app">
    <form data-form>
      <label for="sample-data">Select Period</label>
      <div class="select-container">
        <select id="sample-data" multiple size="8" v-model="selectedTicker">
          <optgroup v-for="(val, key) in groupedData" :key="key" :label="key">
            <option
              v-for="(period, idx) in val"
              :key="idx"
              :value="`${period.ticker}-${period.period_id}`"
            >
              {{ period.period_id }}
            </option>
          </optgroup>
        </select>
      </div>
      <label for="show-table">Show Table</label>
      <input id="show-table" type="checkbox" v-model="showTable" />
    </form>
    <RectangleChart
      v-for="(val, idx) in selectedData"
      :key="idx"
      :input-data="val"
      :show-table="showTable"
    />
  </div>
</template>

<script>
import { compact, find, groupBy } from 'lodash';
import RectangleChart from '@/js/RectangleChart';
import sampleData from './rect_sample.json';

const groupedData = groupBy(sampleData, 'ticker');

export default {
  name: 'DevApp',
  components: {
    RectangleChart,
  },
  data() {
    return {
      groupedData,
      selectedTicker: [],
      selectedData: [],
      showTable: false,
    };
  },
  watch: {
    selectedTicker(ids) {
      this.selectedData = compact(
        ids.map((id) => {
          const [ticker, period] = id.split('-');
          return find(groupedData[ticker], { period_id: parseInt(period, 10) });
        }),
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
}

select {
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: inherit;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  margin: 0;
  padding: 0;
  width: 100%;
}

.select-container {
  border: 1px solid #727272;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.75rem;
  line-height: 1.1;
  max-width: 30ch;
  min-width: 15ch;
  padding: 0.25em 0.5em;
  width: 100%;

  optgroup {
    font-family: inherit;
  }
}

[data-form] {
  font-family: 'Roboto', sans-serif;
}
</style>
