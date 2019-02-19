<template>
   <div>
    <a-button class="editable-add-btn" @click="handleAdd">添加公众号</a-button>
    <a-table bordered :dataSource="dataSource" :columns="columns">
      <template slot="operation" slot-scope="text, record">
        <span>
          <a @click="() => edit(record.key)">Edit</a>
        </span>
        <a-divider type="vertical" />
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)">
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
    <editAccount :visible="visible" @onSubmit="onSubmit" @onClose="onClose"></editAccount>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import editAccount from '@/components/editAccount'
import config from '@/config'
export default {
  layout: 'admin',
  middleware: "auth",
  async asyncData({ query, req, store, isServer }) {
    let { page = config.default_page, limit = config.default_limit } = query
    let header = process.server ? {
      headers: {
           Cookie: req.headers.cookie
      }
      } : {}
    const res = await store.dispatch('getAccounts', {page, limit, header})
    return { dataSource: res.data }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {
    editAccount
  },
  data () {
    return {
      dataSource: [],
      count: 2,
      columns: [{
        title: '公众号',
        dataIndex: 'name',
        width: '30%',
      }, {
        title: 'AppID',
        dataIndex: 'AppID',
      }, {
        title: 'AppSecret',
        dataIndex: 'AppSecret',
      }, {
        title: 'operation',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }],
      visible: false,
    }
  },
  methods: {
    ...mapActions(['getAccounts']),
    onDelete (key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },
    handleAdd () {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    onSubmit() {
      this.visible = false
    }
  },
};
</script>

<style scoped>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
