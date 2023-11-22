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
    <b-card
      class="project-page__one-column"
      title="Запуск выбранных сценариев"
    >
      <validation-observer ref="scenarioSelect">
        <b-form>
          <b-row>
            <b-col cols="12">
              <b-form-group
                label="Выбор сценариев для"
                label-for="select-tests-scenario"
              >
                <validation-provider
                  #default="{ errors }"
                  name="select-tests-scenario"
                  rules="required"
                >
                  <v-select
                    id="select-tests-scenario"
                    v-model="selectTests.selected"
                    multiple
                    label="title"
                    :close-on-select="false"
                    :options="selectTestOptions"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button
                type="submit"
                @click.prevent="startTestSelectedScenarios"
              >
                Старт тестов выбранных сценариев
              </b-button>
            </b-col>
            <b-col>
              <b-button
                type="submit"
                @click.prevent="createReferenceSelectedScenarios"
              >
                Старт принятия эталонов выбранных сценариев
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
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
  BForm,
  BRow,
  BCol,
  BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'

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
    BForm,
    BRow,
    BCol,
    BFormGroup,
    Preloader,
    TestTable,
    DynamicTable,
    vSelect,
    ValidationProvider,
    ValidationObserver,
  },

  props: {
    project: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      required,
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
      return this.getTestScenarios.map(({ label }) => label)
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
    async startTestSelectedScenarios() {
      const result = await this.$refs.scenarioSelect.validate()
      if (!result) {
        return
      }

      this.loading = true
      fetch(`${this.apiAddr}api/start/test-select-scenarios?project=${this.project}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(this.selectTests.selected),
      })
        .then(() => {
          this.loading = false
          this.$refs.table.refresh()
        })
    },

    async createReferenceSelectedScenarios() {
      const result = await this.$refs.scenarioSelect.validate()
      if (!result) {
        return
      }

      this.loading = true
      fetch(`${this.apiAddr}api/reference-select-scenarios?project=${this.project}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(this.selectTests.selected),
      })
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
