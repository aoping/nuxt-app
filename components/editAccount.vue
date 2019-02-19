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
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="AppID">
        <a-input
          v-decorator="[
            'AppID',
            {
              rules: [{
                required: true, message: 'Please input your password!',
              }],
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="AppSecret">
        <a-input
          v-decorator="[
            'AppSecret',
            {
              rules: [{
                required: true, message: 'Please input your password!',
              }],
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
import {mapActions} from 'vuex'
export default {
  props: ['visible'],
  data() {
    return {
    }
  },
  components: {},
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    ...mapActions(['createAccount']),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(async (err, values) => {
        console.log(values)
        if (!err) {
          let res = await this.createAccount(values)
          if (res.success) {
            this.$emit('onClose')
          } else {
            this.$message.error(res.err)
            this.$emit('onClose')
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
