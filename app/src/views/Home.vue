<template>
  <div>
    <router-link :to="{ name: 'project-alpa' }">
      <BButton>Alpa</BButton>
    </router-link>

    <router-link :to="{ name: 'project-thor' }">
      <BButton>Thor</BButton>
    </router-link>

    <router-link :to="{ name: 'project-backoffice' }">
      <BButton>Backoffice</BButton>
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
