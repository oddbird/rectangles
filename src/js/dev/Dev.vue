<template>
  <div id="dev-app">
    <form data-form>
      <label for="sample-data">Select Period</label>
      <div class="select-container">
        <select id="sample-data" multiple v-model="selectedTicker">
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
    </form>
    <App :key="selectedTicker.join()" :input-data="selectedData" />
  </div>
</template>

<script>
import { compact, find, groupBy } from 'lodash';
import App from '@/js/App';
import sampleData from './examples/rect_sample.json';

const groupedData = groupBy(sampleData, 'ticker');

export default {
  name: 'DevApp',
  components: {
    App,
  },
  data() {
    return {
      groupedData,
      selectedTicker: [],
      selectedData: [],
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
