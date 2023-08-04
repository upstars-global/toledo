<template>
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
</template>

<script>
import {
  BButton,
  BTable,
} from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  name: 'TestTable',
  components: {
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

  watch: {
    project: {
      handler() {
        this.$refs.table.refresh()
      },
    },
  },

  methods: {
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
      this.$emit('show-modal', item)
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

    onRowClick(row) {
      this.$router.push({
        name: `report-page-${this.project}`,
        params: {
          test: row.origin,
        },
      })
      // window.location = `${this.apiAddr}report/${row.origin}?project=${this.project}`
    },
  },
}
</script>

<style scoped>

</style>
