<template>
  <div id="app">
    <Chart v-if="inputData" :input-data="inputData" />
    <span v-else>Please select a ticker.</span>
  </div>
</template>

<script>
import Chart from "@/js/components/Chart";

export default {
  name: "App",
  components: {
    Chart,
  },
  props: {
    inputData: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss">
#app {
  @import "../sass/app";
}
</style>
