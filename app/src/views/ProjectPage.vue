<template>
  <div class="project-page">
    <b-card
      title="Использование дискового места"
      class="project-page__one-column"
    >
      <div>
        <b>Tests: </b>
        <span :class="testDiskUsageClass">{{
          Number(spaseUsage.testFolderSize)
            .toFixed(2)
        }}</span> / 20000 mb
      </div>
      <div><b>References: </b>{{
        Number(spaseUsage.referenceFolderSize)
          .toFixed(2)
      }} / 1000 mb
      </div>
    </b-card>
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
    <b-card title="Запуск тестов выбранных сценариев">
      <b-form-select
        v-model="selectTests.selected"
        :options="selectTestOptions"
        multiple
        label-field="title"
        :select-size="4"
      />
      <div class="mt-1">
        Selected: <strong>{{ selectTests.selected }}</strong>
      </div>

      <b-button @click="startNewTest">
        Старт выбранных сценариев
      </b-button>
    </b-card>

    <b-card
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
        ref="table"
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
  BFormSelect,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
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
    BFormSelect,
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
      spaseUsage: {
        testFolderSize: 0,
        referenceFolderSize: 0,
      },
      item: {},
      selectTests: {
        dir: 'ltr',
        selected: [],
      },

    }
  },

  computed: {
    ...mapGetters('app', {
      apiAddr: 'apiAddr',
      getTestScenarios: 'getTestScenarios',
    }),

    testDiskUsageClass() {
      const usage = Number(this.spaseUsage.testFolderSize)
      if (usage < 17000) {
        return 'green'
      }

      if (usage < 19000) {
        return 'orange'
      }

      return 'red'
    },

    selectTestOptions() {
      return this.getTestScenarios.map(({ label }) => ({
        value: label,
        text: label,
      }))
    },
  },

  created() {
    this.loadSpaseUsage()
  },

  mounted() {
    this.getAllScenarios(this.project)
  },

  methods: {
    ...mapActions('app', {
      getAllScenarios: 'getAllScenarios',
    }),
    loadSpaseUsage() {
      fetch(`${this.apiAddr}api/spase-usage`)
        .then(res => res.json())
        .then(res => {
          this.spaseUsage = res
        })
    },

    startNewTest() {
      this.loading = true
      fetch(`${this.apiAddr}api/start?project=${this.project}`)
        .then(() => {
          this.loading = false
          this.$refs.table.refresh()
        })
    },

    createReference() {
      this.loading = true
      fetch(`${this.apiAddr}api/reference?project=${this.project}`)
        .then(() => {
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
      fetch(`${this.apiAddr}api/delete?project=${this.project}&folder=${this.item.origin}`)
        .then(() => {
          this.loading = false
          this.loadSpaseUsage()
          this.$refs.table.refresh()
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

  & .green {
    color: green;
  }

  & .orange {
    color: orange;
  }

  & .red {
    color: red;
  }
}
</style>
