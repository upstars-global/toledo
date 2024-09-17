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
          :disabled="!isAws"
          @click.stop="startNewDynTest(item)"
        >
          Запуск теста
        </b-button>
        <b-button
          variant="secondary"
          :disabled="!isAws"
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

  data() {
    return {
      isAws: false,
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

  mounted() {
    this.isAws = window.location.host.includes('wlabel.site')
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
        return `https://mock-${key}.rocketplay.wlabel.site`
      }

      return `https://mock-${key}-thor.development.wlabel.site`
    },

    startNewDynTest(item) {
      this.loading = true
      fetch(`${this.apiAddr}api/start?project=${this.project}&dyn=${item.id.toUpperCase()}`).then(() => {
        this.loading = false
        this.$refs.table.refresh()
      })
    },

    fetchTable(_, callback) {
      fetch(`${this.apiAddr}api/app-list?project=${this.project}`).then(res => res.json()).then(res => {
        callback(
          res
            .filter(folder => !folder.startsWith('s3'))
            .filter(folder => Boolean(folder.match(/(alpa-\d+|fp-\d+|sre-\d+|revert-[0-9a-f]+)/)))
            .map(folder => ({ id: folder.match(/(alpa-\d+|fp-\d+|sre-\d+|revert-[0-9a-f]+)/)[0], origin: folder })),
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
