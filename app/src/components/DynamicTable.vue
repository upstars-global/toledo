<template>
  <b-table
    ref="table"
    hover
    :fields="selectedTableFields()"
    :items="fetchTable"
  >
    <template #cell(id)="{ item }">
      <a
        :href="getEnvUrl(item.id)"
        target="_blank"
      >
        {{ item.id.toUpperCase() }}
      </a>
    </template>
    <template #cell(actions)="{ item }">
      <div class="buttons">
        <b-button
          variant="success"
          :disabled="project === 'thor'"
          @click.stop="startNewDynTest(item)"
        >
          Запуск теста
        </b-button>
        <b-button
          variant="secondary"
          :disabled="project === 'thor'"
          @click.stop="openReport(item)"
        >
          Результаты
        </b-button>
        <a
          :href="`https://upstars.atlassian.net/browse/${ item.id.toUpperCase() }`"
          target="_blank"
        >
          <b-button
            variant="primary"
            @click.stop="showModal(item)"
          >
            Jira
          </b-button>
        </a>
      </div>
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
  name: 'DynamicTable',
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
          key: 'id', label: 'Окружения', sortable: false,
        },
        {
          key: 'actions', label: 'Действия',
        },
      ]
    },

    getEnvUrl(key) {
      if (this.project === 'alpa') {
        return `https://mock-${key}-ss.rocketplay.com`
      }

      return `https://${key}-thor.thor-develop.upstr.to`
    },

    startNewDynTest(item) {
      this.loading = true
      fetch(`${this.apiAddr}api/start?project=${this.project}&dyn=${item.id.toUpperCase()}-ss`).then(() => {
        this.loading = false
        this.$refs.table.refresh()
      })
    },

    fetchTable(_, callback) {
      fetch(`${this.apiAddr}api/app-list?project=${this.project}`).then(res => res.json()).then(res => {
        callback(
          res
            .filter(folder => !folder.startsWith('s3'))
            .map(folder => ({ id: folder.match(/(alpa-\d+|fp-\d+|revert-[0-9a-f]+)/)[0], origin: folder })),
        )
      })
    },

    openReport(row) {
      this.$router.push({
        name: `report-page-${this.project}`,
        params: {
          test: row.id.toUpperCase(),
        },
      })
    },
  },
}
</script>

<style scoped>
.buttons {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
