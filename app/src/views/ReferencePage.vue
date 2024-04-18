<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ReferencePage',
  computed: {
    ...mapGetters('app', {
      apiAddr: 'apiAddr',
    }),
  },
  mounted() {
    fetch(`${this.apiAddr}api/spase-usage`)
      .then(res => res.json())
      .then(res => {
        this.spaseUsage = res
      })
  },
}
</script>

<template>
  <div>
    Reference page
  </div>
</template>

<style scoped lang="scss">

</style>
