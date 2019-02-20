<template>
   <div>
    <a-button class="editable-add-btn" @click="handleAdd">添加公众号</a-button>
    <a-table bordered :dataSource="accounts" :columns="columns">
      <template slot="operation" slot-scope="text, record">
        <span>
          <a @click="() => handleEdit(record)">Edit</a>
        </span>
        <a-divider type="vertical" />
        <a-popconfirm
          v-if="accounts.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record._id)">
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
    <editAccount v-if="visible" :visible="visible" @onSubmit="onSubmit" @onClose="onClose"></editAccount>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
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
  },
  computed: {
    ...mapState(['user', 'accountList']),
    ...mapGetters(['accounts'])
  },
  components: {
    editAccount
  },
  data () {
    return {
      count: 2,
      columns: [{
        title: '公众号',
        dataIndex: 'name',
        width: '20%',
      }, {
        title: 'appID',
        dataIndex: 'appID',
      }, {
        title: 'appSecret',
        dataIndex: 'appSecret',
      },{
        title: 'token',
        dataIndex: 'token',
      },
      {
        title: '配置URL',
        dataIndex: 'hearlink',
      },
      {
        title: 'operation',
        width: '150px',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }],
      visible: false,
    }
  },
  methods: {
    ...mapActions(['getAccounts', 'delAccount']),
    ...mapMutations(['SET_ACCOUNT']),
    onDelete (id) {
      this.delAccount(id)
    },
    handleAdd (record) {
      this.SET_ACCOUNT(null)
      this.visible = true
    },
    handleEdit (record) {
      this.SET_ACCOUNT(record)
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
