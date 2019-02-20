<template>
<a-layout>
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <p class="logo">
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z" fill="#6B676E" p-id="1143" />
          <path d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z" fill="#FFEBD2" p-id="1144" />
          <path d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z" fill="#E9D7C3" p-id="1145" />
          <path d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z" fill="#FFFFFF" p-id="1146" />
          <path d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z" fill="#6B676E" p-id="1147" />
          <path d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z" fill="#464655" p-id="1148" />
          <path d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z" fill="#464655" p-id="1149" />
          <path d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z" fill="#464655" p-id="1150" />
        </svg>
      </p>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>公众号</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>文章</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <a-row>
          <a-col :span="12">
            <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
          </a-col>
          <a-col :span="12" v-if="user" class="header-right">
            <span>{{user.email}}</span>
            <a-divider type="vertical" />
            <a-avatar style="color: #f56a00; backgroundColor: #fde3cf">{{user.nickname}}</a-avatar>
            <a-divider type="vertical" />
            <a style="color:#000;" href="javascript:;" @click="handleLogout">登出</a>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '0 24px', background: '#fff', minHeight: '280px' }">
        <nuxt/>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data(){
    return {
      collapsed: false,
    }
  },
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

<style scoped>
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
  padding-right: 30px;
  padding-left: 30px;
  background: #fff;
  color: #000;
}
.ant-layout-footer {
  line-height: 1.5;
}

.ant-layout-content {
  min-height: 120px;
  line-height: 120px;
}
.header-right{
  text-align: right;
}
.logo {
  height: 32px;
  margin: 16px;
  color:#fff;
  font-size: 32px;
  line-height: 32px;
  text-align: center;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 30px;
  margin-left: -30px;
  cursor: pointer;
  transition: color .3s;
  color:#000;
}

.trigger:hover {
  color: #1890ff;
}

</style>
