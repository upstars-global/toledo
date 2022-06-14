<template>
  <div>
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
    <b-card no-body>
      <b-table
        v-slot="{ }"
        hover
        :fields="selectedTableFields()"
        :items="fetchTable"
        @row-clicked="onRowClick"
      />
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BButton,
  BTable,
} from 'bootstrap-vue'
import { mapGetters } from 'vuex'

// import { TableField } from '@core/components/table-fields/model'

export default {
  name: 'ProjectPage',

  components: {
    BCard,
    BButton,
    BTable,
  },

  props: {
    project: {
      type: String,
      default: '',
    },
  },

  computed: {
    ...mapGetters('app', {
      apiAddr: 'apiAddr',
    }),
  },

  methods: {
    startNewTest() {
      let hostName = 'staging-mock.rocketplay.com'
      if (this.project === 'thor') {
        hostName = 'winspirit.com'
      }
      fetch(`${this.apiAddr}api/start?hostName=${hostName}&project=${this.project}`)
    },

    createReference() {
      fetch(`${this.apiAddr}api/reference?hostName=staging-mock.rocketplay.com&project=${this.project}`)
    },

    onRowClick(row) {
      this.$router.push({
        name: 'report-page',
        params: {
          test: row.origin,
          project: this.project,
        },
      })
      // window.location = `${this.apiAddr}report/${row.origin}?project=${this.project}`
    },

    fetchTable(_, callback) {
      fetch(`${this.apiAddr}api/test-list?project=${this.project}`).then(res => res.json()).then(res => {
        callback(res.map(folder => {
          const dateString = `${folder.slice(0, 4)}-${folder.slice(4, 6)}-${folder.slice(6, 8)} ${folder.slice(9, 11)}:${folder.slice(11, 13)}:${folder.slice(13, 15)}`
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
      ]
    },
  },
}
</script>

<style scoped>

</style>
