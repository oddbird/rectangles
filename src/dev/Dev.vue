<template>
  <div id="dev-app">
    <form>
      <label for="sample-data">Select Ticker</label>
      <select id="sample-data" v-model="selectedTicker">
        <option value="">---</option>
        <option v-for="(val, key) in examples" :key="key" :value="key">
          {{ key }}
        </option>
      </select>
    </form>
    <App key="selectedTicker" :input-data="selectedData" />
  </div>
</template>

<script>
import { groupBy, last } from "lodash";
import App from "@/App";
import sampleData from "./examples/rect_sample.json";

const examples = groupBy(sampleData, "ticker");

export default {
  name: "DevApp",
  components: {
    App,
  },
  data() {
    return {
      examples,
      selectedTicker: "",
      selectedData: null,
    };
  },
  watch: {
    selectedTicker(key) {
      this.selectedData = last(examples[key] || []) || null;
    },
  },
};
</script>
