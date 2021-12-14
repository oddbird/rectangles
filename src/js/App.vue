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
@use '../sass/app';
</style>
