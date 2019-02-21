<template>
  <a-drawer
      title="Multi-level drawer"
      width=520
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
    <a-form class="ant-form" :form="form" @submit="handleSubmit">
      <a-form-item label="title">
        <a-input
          v-decorator="[
            'title',
            {
              rules: [{
                required: true, message: 'Please input your title!',
              }],
              initialValue: topic&&topic.title
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="author">
        <a-input
          v-decorator="[
            'author',
            {
              rules: [{
                required: true, message: 'Please input your author!',
              }],
              initialValue: topic&&topic.author
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="account">
        <a-select
          v-decorator="[
            'account',
            {
              rules: [{
                required: true, message: 'Please select your account!',
              }],
              initialValue: topic&&topic.account || ''
            }
          ]"
        >
          <a-select-option value=''>请选择</a-select-option>
          <a-select-option v-for="item in accounts" :value="item._id" :key="item._id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <div label="content">
        <p>content</p>
        <div class="quill-editor"
            :content="content"
            @change="onEditorChange($event)"
            v-quill:myQuillEditor="editorOption"
        ></div>
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
    </a-drawer>
</template>

<script>
import {mapState,mapActions, mapGetters} from 'vuex'
export default {
  props: ['visible'],
  data() {
    return {
      content: '',
      editorOption:{}
    }
  },
  components: {},
  computed:{
    ...mapState(['topic']),
    ...mapGetters(['accounts'])
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  mounted() {
    this.content = this.topic && this.topic.content || ''
  },
  methods: {
    ...mapActions(['createTopic', 'editTopic']),
    onEditorChange({ editor, html, text }) {
      this.content = html
    },
    handleSubmit(e) {
      e.preventDefault();
      if (!this.content) {
        this.$message.error('请输入content')
        return
      }
      this.form.validateFieldsAndScroll(async (err, values) => {
        Object.assign(values, {content: this.content})
        if (!err) {
          if (!this.topic) {
            let res = await this.createTopic(values)
            if (res.success) {
              this.$emit('onClose')
            } else {
              this.$message.error(res.err)
              this.$emit('onClose')
            }
          } else{
            values = Object.assign({}, this.topic, values)
            let res = await this.editTopic(values)
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
 .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
</style>
