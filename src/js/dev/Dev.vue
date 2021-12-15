<template>
  <div id="dev-app">
    <form data-form>
      <label for="sample-data">Select Period</label>
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
[data-form] {
  font-family: 'Roboto', sans-serif;

  label {
    margin-right: 0.5rem;
  }
}
</style>
