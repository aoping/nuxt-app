<template>
  <div>
    <a-form class="ant-form" :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="E-mail">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Password">
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: validateToNextPassword,
              }],
            }
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" html-type="submit">登录</a-button>
        <nuxt-link class="btn-sign" to="/admin/signup">未注册</nuxt-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import axios from "../../plugins/axios";

export default {
  data() {
    return {
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          let res = await this.$store.dispatch('login', values)
          if (res.success) {
            this.$router.push('/admin')
          } else {
            this.$message.error(res.err)
          }
        }
      });
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    }
  }
};
</script>

<style scoped>
.btn-sign{
  display: inline-block;
  margin: 20px 30px;
}
.ant-form {
  margin: 50px 0;
  max-width: 1000px;
}
</style>
