<template>
  <iframe :src="`${ apiAddr }report?test=${test}&project=${project}`" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ReportPage',

  props: {
    project: {
      type: String,
      default: '',
    },
    test: {
      type: String,
      default: '',
    },
  },

  computed: {
    ...mapGetters('app', {
      apiAddr: 'apiAddr',
    }),
  },
}
</script>

<style scoped>
iframe {
  width: 100%;
  height: calc(100vh - 170px);
  border: 0;
}
</style>
