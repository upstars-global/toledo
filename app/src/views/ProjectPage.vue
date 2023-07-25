<template>
  <div>
    <b-card title="Запуск нового теста">
      <b-button @click="startNewTest">
        Старт
      </b-button>
    </b-card>
    <b-card
      v-if="project === 'alpa'"
      title="Запуск нового теста на динамическом окружении"
    >
      <b-form-input
        v-model="dynEnv"
        :state="null"
        class="form-control-merge mb-1"
        placeholder="ALPA-XXX"
      />
      <b-button @click="startNewDynTest">
        Старт
      </b-button>
    </b-card>

    <b-card title="Признание новых эталонов">
      <b-button @click="createReference">
        Старт
      </b-button>
    </b-card>
    <b-card no-body>
      <b-table
        ref="table"
        hover
        :fields="selectedTableFields()"
        :items="fetchTable"
        @row-clicked="onRowClick"
      >
        <template #cell(actions)="{ item }">
          <b-button
            variant="danger"
            @click.stop="showModal(item)"
          >
            Удалить
          </b-button>
        </template>
      </b-table>
    </b-card>
    <b-modal
      ref="my-modal"
      hide-footer
    >
      <div class="mb-1">
        Удалить?
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
  BTable,
  BFormInput,
  BModal,
} from 'bootstrap-vue'
import { mapGetters } from 'vuex'

import Preloader from '@/components/Preloader.vue'

export default {
  name: 'ProjectPage',

  components: {
    BCard,
    BButton,
    BTable,
    BFormInput,
    BModal,
    Preloader,
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
      dynEnv: 'ALPA-',
    }
  },

  computed: {
    ...mapGetters('app', {
      apiAddr: 'apiAddr',
    }),
  },

  watch: {
    project: {
      handler() {
        this.$refs.table.refresh()
      },
    },
  },

  methods: {
    startNewTest() {
      this.loading = true
      fetch(`${this.apiAddr}api/start?project=${this.project}`).then(() => {
        this.loading = false
        this.$refs.table.refresh()
      })
    },

    startNewDynTest() {
      if (!this.dynEnv || this.dynEnv === 'ALPA-') {
        return
      }

      this.loading = true
      fetch(`${this.apiAddr}api/start?project=${this.project}&dyn=${this.dynEnv}`).then(() => {
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

    onRowClick(row) {
      this.$router.push({
        name: `report-page-${this.project}`,
        params: {
          test: row.origin,
        },
      })
      // window.location = `${this.apiAddr}report/${row.origin}?project=${this.project}`
    },

    fetchTable(_, callback) {
      fetch(`${this.apiAddr}api/test-list?project=${this.project}`).then(res => res.json()).then(res => {
        callback(res.map(folder => {
          const dateString = folder.startsWith('v') || folder.startsWith('master') || folder.startsWith('ALPA-')
            ? folder
            : `${folder.slice(0, 4)}-${folder.slice(4, 6)}-${folder.slice(6, 8)} ${folder.slice(9, 11)}:${folder.slice(11, 13)}:${folder.slice(13, 15)}`
          return {
            Id: dateString,
            origin: folder,
          }
        }))
      })
    },

    selectedTableFields() {
      return [
        {
          key: 'Id', label: 'Тесты', sortable: false,
        },
        {
          key: 'actions', label: 'Действия',
        },
      ]
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

<style scoped>

</style>
