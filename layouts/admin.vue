<template>
  <a-layout>
    <a-layout-header>
      <a-row>
        <a-col :span="12">后台管理系统</a-col>
        <a-col :span="12" v-if="user" class="header-right">
          <span>{{user.email}}</span>
          <a-divider type="vertical" />
          <a-avatar style="color: #f56a00; backgroundColor: #fde3cf">{{user.nickname}}</a-avatar>
          <a-divider type="vertical" />
          <a style="color:#fff;" href="javascript:;" @click="handleLogout">登出</a>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <nuxt/>
    </a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['user'])
  },
  methods:{
    ...mapActions([
      'logout'
    ]),
    async handleLogout() {
      let res = await this.logout()
      if (res.success) {
        this.$router.push('/admin/login')
      } else {
        this.$message.error(res.err)
      }
    }
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.ant-layout-header,
.ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
.ant-layout-footer {
  line-height: 1.5;
}
.ant-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
}
.ant-layout-content {
  min-height: 120px;
  line-height: 120px;
}
.header-right{
  text-align: right;
}
</style>
