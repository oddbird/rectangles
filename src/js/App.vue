<template>
  <div id="app">
    <Chart v-for="(val, idx) in inputData" :key="idx" :input-data="val" />
    <span v-if="!inputData.length">Please select a company and period.</span>
  </div>
</template>

<script>
import Chart from '@/js/components/Chart';

export default {
  name: 'App',
  components: {
    Chart,
  },
  props: {
    inputData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

#app {
  @import '../sass/app';
  --rect-stroke: #ffffff;
  --income: #358639;
  --sga: #cf4747;
  --cogs: #8b0020;
  --text: #00000099;
  --border-color: #e4e4e4;
  font-family: 'Roboto', sans-serif;
}
</style>
