<template>
  <a-drawer
      title="Multi-level drawer"
      width=520
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
    <a-form class="ant-form" :form="form" @submit="handleSubmit">
      <a-form-item label="公众号名称">
        <a-input
          v-decorator="[
            'name',
            {
              rules: [{
                required: true, message: 'Please input your account!',
              }],
              initialValue: account&&account.name
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="appID">
        <a-input
          v-decorator="[
            'appID',
            {
              rules: [{
                required: true, message: 'Please input your password!',
              }],
              initialValue:account&&account.appID
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="appSecret">
        <a-input
          v-decorator="[
            'appSecret',
            {
              rules: [{
                required: true, message: 'Please input your password!',
              }],
              initialValue: account&&account.appSecret
            }
          ]"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
    </a-drawer>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  props: ['visible'],
  data() {
    return {
    }
  },
  components: {},
  computed:{
    ...mapState(['account'])
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    ...mapActions(['createAccount', 'editAccount']),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(async (err, values) => {
        console.log(values)
        if (!err) {
          if (!this.account) {
            let res = await this.createAccount(values)
            if (res.success) {
              this.$emit('onClose')
            } else {
              this.$message.error(res.err)
              this.$emit('onClose')
            }
          } else{
            values = Object.assign({}, this.account, values)
            let res = await this.editAccount(values)
            if (res.success) {
              this.$emit('onClose')
            } else {
              this.$message.error(res.err)
              this.$emit('onClose')
            }
          }
        }
      });
    },
    onClose() {
      this.$emit('onClose')
    },
  }
}
</script>

<style scoped>

</style>
