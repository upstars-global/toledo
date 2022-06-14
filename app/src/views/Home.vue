<template>
  <div>
    <router-link :to="{ name: 'project-alpa' }">
      <BButton>ALPA</BButton>
    </router-link>

    <router-link :to="{ name: 'project-thor' }">
      <BButton>THOR</BButton>
    </router-link>
  </div>
</template>

<script>
import {
  BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BButton,
  },

  data() {
    return {
      project: 'alpa',
    }
  },
}
</script>

<style>
button {
  margin-right: 1rem;
}
</style>
