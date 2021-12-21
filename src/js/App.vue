<template>
  <div id="rectangles-root" data-layout="rectangles-root">
    <Chart v-for="(val, idx) in inputData" :key="idx" :input-data="val" />
    <p v-if="!inputData.length">Please select a company and period.</p>
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

[data-layout='rectangles-root'] {
  --rect-stroke: #ffffff;
  --income: #358639;
  --sga: #cf4747;
  --cogs: #8b0020;
  --text: #00000099;
  --background: #ffffff;
  --border-color: #e4e4e4;
  --gutter: 1rem;
  --double-gutter: calc(var(--gutter) * 2);
  --shim: calc(var(--gutter) / 2);
  font-family: 'Roboto', sans-serif;
}
</style>
