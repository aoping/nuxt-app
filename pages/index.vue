<template>
   <div class="content">
    <nuxt-link class="btn-sign" to="/admin/login">登录/注册</nuxt-link>
    <a-table bordered :dataSource="topics" :columns="columns">
      <template slot="name" slot-scope="text, record">
        <nuxt-link :to="'/topic/'+record._id" target="_blank">
          {{text}}
        </nuxt-link>
      </template>
    </a-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import config from '@/config'
import {getAllTopics} from '@/store/services'

export default {
  layout: 'mobile',
  async asyncData({ query, req, store, isServer }) {
    let { page = config.default_page, limit = config.default_limit } = query
    let res = await getAllTopics(page, limit)
    console.log('asyncData')
    console.log(res)
    // 处理成ant-design form要求的格式
    let formated = res.data.map((item, index) => {
      return Object.assign({}, item, {
        key: index,
        name: item.title
      })
    })
    return {topics: formated}
  },
  components: {
  },
  data () {
    return {
      topics: [],
      count: 2,
      columns: [
        {
          title: 'name',
          dataIndex: 'name',
          width: '20%',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'author',
          dataIndex: 'author',
        },
        {
          title: 'accountName',
          dataIndex: 'accountName',
        },
      ],
    }
  },
  methods: {

  },
};
</script>

<style scoped>
.btn-sign{
  display: inline-block;
  margin: 20px 30px;
}
.content{
  padding-top: 30px;
}

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
