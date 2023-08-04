<template>
  <div class="project-page">
    <b-card title="Запуск нового теста">
      <b-button @click="startNewTest">
        Старт
      </b-button>
    </b-card>
    <b-card title="Признание новых эталонов">
      <b-button @click="createReference">
        Старт
      </b-button>
    </b-card>
    <b-card
      v-if="project === 'alpa'"
      class="project-page__one-column"
      no-body
    >
      <DynamicTable
        :project="project"
      />
    </b-card>
    <b-card
      class="project-page__one-column"
      no-body
    >
      <TestTable
        :project="project"
        @show-modal="showModal"
      />
    </b-card>
    <b-modal
      ref="my-modal"
      hide-footer
    >
      <div class="mb-1">
        {{ item.Id }} Удалить результат теста?
      </div>
      <b-button
        variant="danger"
        class="mr-1"
        @click="deleteTest"
      >
        Удалить
      </b-button>
      <b-button
        @click="hideModal"
      >
        Отмена
      </b-button>
    </b-modal>
    <Preloader v-if="loading" />
  </div>
</template>

<script>
import {
  BCard,
  BButton,
  BModal,
} from 'bootstrap-vue'
import { mapGetters } from 'vuex'
import TestTable from '@/components/TestTable.vue'
import DynamicTable from '@/components/DynamicTable.vue'

import Preloader from '@/components/Preloader.vue'

export default {
  name: 'ProjectPage',

  components: {
    BCard,
    BButton,
    BModal,
    Preloader,
    TestTable,
    DynamicTable,
  },

  props: {
    project: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      loading: false,
      item: {},
    }
  },

  computed: {
    ...mapGetters('app', {
      apiAddr: 'apiAddr',
    }),
  },

  methods: {
    startNewTest() {
      this.loading = true
      fetch(`${this.apiAddr}api/start?project=${this.project}`).then(() => {
        this.loading = false
        this.$refs.table.refresh()
      })
    },

    createReference() {
      this.loading = true
      fetch(`${this.apiAddr}api/reference?project=${this.project}`).then(() => {
        this.loading = false
      })
    },

    showModal(item) {
      this.item = item
      this.$refs['my-modal'].show()
    },

    hideModal() {
      this.$refs['my-modal'].hide()
    },

    deleteTest() {
      this.loading = true
      fetch(`${this.apiAddr}api/delete?project=${this.project}&folder=${this.item.origin}`).then(() => {
        this.$refs.table.refresh()
        this.loading = false
      })
      this.hideModal()
    },
  },
}
</script>

<style lang="scss" scoped>
.project-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;

  &__one-column {
    grid-column: 1 / 3;
  }
}
</style>
